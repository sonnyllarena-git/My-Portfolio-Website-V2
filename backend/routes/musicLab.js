import { Router } from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'
import {
  uploadToStorage,
  deleteFromStorage,
  keyFromUrl,
} from '../supabaseStorageClient.js'

const router = Router()

const MAX_TITLE_LENGTH = 80
const MAX_ARTIST_LENGTH = 80
const MAX_ALBUM_LENGTH = 80
const MAX_MEDIA_BYTES = 200 * 1024 * 1024 // 200MB — generous for a video, still a real cap
const MAX_THUMBNAIL_BYTES = 5 * 1024 * 1024 // 5MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MEDIA_BYTES },
})

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, type, title, artist, album, duration, mediaUrl AS "mediaUrl", thumbnailUrl AS "thumbnailUrl", createdAt AS "createdAt" FROM musicLabItems ORDER BY createdAt DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching music lab items:', err)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

router.post(
  '/',
  requireAuth,
  upload.fields([
    { name: 'media', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  async (req, res) => {
    const type = req.body?.type
    const title =
      typeof req.body?.title === 'string'
        ? req.body.title.trim().slice(0, MAX_TITLE_LENGTH)
        : ''
    const artist =
      typeof req.body?.artist === 'string'
        ? req.body.artist.trim().slice(0, MAX_ARTIST_LENGTH)
        : ''
    const album =
      typeof req.body?.album === 'string'
        ? req.body.album.trim().slice(0, MAX_ALBUM_LENGTH)
        : ''
    const duration = Number(req.body?.duration)
    const mediaFile = req.files?.media?.[0]
    const thumbnailFile = req.files?.thumbnail?.[0]

    if (type !== 'video' && type !== 'track') {
      return res.status(400).json({ error: 'Invalid type' })
    }
    if (!title) return res.status(400).json({ error: 'Invalid title' })
    if (!Number.isFinite(duration) || duration < 0) {
      return res.status(400).json({ error: 'Invalid duration' })
    }
    if (!mediaFile) {
      return res.status(400).json({ error: 'Media file is required' })
    }
    const expectedPrefix = type === 'video' ? 'video/' : 'audio/'
    if (!mediaFile.mimetype.startsWith(expectedPrefix)) {
      return res
        .status(400)
        .json({ error: `Media file must be ${expectedPrefix}*` })
    }
    if (thumbnailFile) {
      if (!thumbnailFile.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Thumbnail must be an image' })
      }
      if (thumbnailFile.size > MAX_THUMBNAIL_BYTES) {
        return res.status(400).json({ error: 'Thumbnail is too large' })
      }
    }

    try {
      const id = randomUUID()
      const mediaExt = extname(mediaFile.originalname)
      const mediaUrl = await uploadToStorage(
        mediaFile.buffer,
        `music-lab/${id}/media${mediaExt}`,
        mediaFile.mimetype,
      )

      let thumbnailUrl = null
      if (thumbnailFile) {
        const thumbExt = extname(thumbnailFile.originalname)
        thumbnailUrl = await uploadToStorage(
          thumbnailFile.buffer,
          `music-lab/${id}/thumbnail${thumbExt}`,
          thumbnailFile.mimetype,
        )
      }

      const createdAt = new Date().toISOString()
      const result = await pool.query(
        `INSERT INTO musicLabItems (type, title, artist, album, duration, mediaUrl, thumbnailUrl, createdAt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, type, title, artist, album, duration, mediaUrl AS "mediaUrl", thumbnailUrl AS "thumbnailUrl", createdAt AS "createdAt"`,
        [
          type,
          title,
          artist,
          album,
          duration,
          mediaUrl,
          thumbnailUrl,
          createdAt,
        ],
      )
      res.status(201).json(result.rows[0])
    } catch (err) {
      console.error('Error uploading music lab item:', err)
      res.status(500).json({ error: 'Failed to upload item' })
    }
  },
)

router.patch('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }
  const title =
    typeof req.body?.title === 'string'
      ? req.body.title.trim().slice(0, MAX_TITLE_LENGTH)
      : ''
  const artist =
    typeof req.body?.artist === 'string'
      ? req.body.artist.trim().slice(0, MAX_ARTIST_LENGTH)
      : ''
  const album =
    typeof req.body?.album === 'string'
      ? req.body.album.trim().slice(0, MAX_ALBUM_LENGTH)
      : ''
  if (!title) return res.status(400).json({ error: 'Invalid title' })

  try {
    const result = await pool.query(
      `UPDATE musicLabItems SET title = $1, artist = $2, album = $3 WHERE id = $4
       RETURNING id, type, title, artist, album, duration, mediaUrl AS "mediaUrl", thumbnailUrl AS "thumbnailUrl", createdAt AS "createdAt"`,
      [title, artist, album, id],
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error updating music lab item:', err)
    res.status(500).json({ error: 'Failed to update item' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const existing = await pool.query(
      'SELECT mediaUrl AS "mediaUrl", thumbnailUrl AS "thumbnailUrl" FROM musicLabItems WHERE id = $1',
      [id],
    )
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }

    const { mediaUrl, thumbnailUrl } = existing.rows[0]
    const mediaKey = keyFromUrl(mediaUrl)
    if (mediaKey) {
      await deleteFromStorage(mediaKey).catch((err) =>
        console.error('Failed to delete media from storage:', mediaKey, err),
      )
    }
    const thumbnailKey = thumbnailUrl ? keyFromUrl(thumbnailUrl) : null
    if (thumbnailKey) {
      await deleteFromStorage(thumbnailKey).catch((err) =>
        console.error(
          'Failed to delete thumbnail from storage:',
          thumbnailKey,
          err,
        ),
      )
    }

    await pool.query('DELETE FROM musicLabItems WHERE id = $1', [id])
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting music lab item:', err)
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

export default router
