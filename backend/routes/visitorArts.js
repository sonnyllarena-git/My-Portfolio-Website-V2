import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

const MAX_TITLE_LENGTH = 60
const MAX_AUTHOR_LENGTH = 40
const MAX_IMAGE_DATA_LENGTH = 4_000_000 // ~4M chars of base64, comfortable headroom for a 1200x800 PNG

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, author, imageData AS "imageData", createdAt AS "createdAt" FROM visitorArtworks ORDER BY createdAt DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching visitor artworks:', err)
    res.status(500).json({ error: 'Failed to fetch artworks' })
  }
})

router.post('/', async (req, res) => {
  const title =
    typeof req.body?.title === 'string' && req.body.title.trim()
      ? req.body.title.trim().slice(0, MAX_TITLE_LENGTH)
      : 'Untitled'
  const author =
    typeof req.body?.author === 'string' && req.body.author.trim()
      ? req.body.author.trim().slice(0, MAX_AUTHOR_LENGTH)
      : 'Guest'
  const imageData =
    typeof req.body?.imageData === 'string' ? req.body.imageData : ''

  if (!imageData.startsWith('data:image/')) {
    return res.status(400).json({ error: 'Invalid image data' })
  }
  if (imageData.length > MAX_IMAGE_DATA_LENGTH) {
    return res.status(400).json({ error: 'Image is too large' })
  }

  try {
    const createdAt = new Date().toISOString()
    const result = await pool.query(
      `INSERT INTO visitorArtworks (title, author, imageData, createdAt)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, author, imageData AS "imageData", createdAt AS "createdAt"`,
      [title, author, imageData, createdAt],
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error saving visitor artwork:', err)
    res.status(500).json({ error: 'Failed to save artwork' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const result = await pool.query(
      'DELETE FROM visitorArtworks WHERE id = $1',
      [id],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Artwork not found' })
    }
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting visitor artwork:', err)
    res.status(500).json({ error: 'Failed to delete artwork' })
  }
})

export default router
