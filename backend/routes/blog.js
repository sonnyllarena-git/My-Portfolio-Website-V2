import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

const VALID_POST_IDS = ['blog-1', 'blog-2', 'blog-3', 'blog-4']
const VALID_ACTIVITY_TYPES = ['join', 'like', 'comment']
const MAX_NAME_LENGTH = 40
const MAX_AVATAR_COLOR_LENGTH = 20
const MAX_COMMENT_LENGTH = 500

function sanitizeName(value) {
  return typeof value === 'string' ? value.trim().slice(0, MAX_NAME_LENGTH) : ''
}

function sanitizeAvatarColor(value) {
  return typeof value === 'string'
    ? value.trim().slice(0, MAX_AVATAR_COLOR_LENGTH)
    : ''
}

async function insertActivity({ type, name, avatarColor, postId }) {
  const result = await pool.query(
    `INSERT INTO blogActivity (type, name, avatarColor, postId, createdAt)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, type, name, avatarColor AS "avatarColor", postId AS "postId", createdAt AS "createdAt"`,
    [type, name, avatarColor, postId ?? null, new Date().toISOString()],
  )
  const { createdAt, ...rest } = result.rows[0]
  return { ...rest, timestamp: createdAt }
}

router.get('/interactions', async (req, res) => {
  try {
    const likesResult = await pool.query(
      'SELECT postId AS "postId", name, avatarColor AS "avatarColor" FROM blogLikes',
    )
    const commentsResult = await pool.query(
      'SELECT id, postId AS "postId", name, avatarColor AS "avatarColor", text, createdAt AS "createdAt" FROM blogComments ORDER BY createdAt ASC',
    )

    const interactions = {}
    for (const postId of VALID_POST_IDS) {
      interactions[postId] = { likes: [], comments: [] }
    }
    for (const like of likesResult.rows) {
      interactions[like.postId]?.likes.push({
        name: like.name,
        avatarColor: like.avatarColor,
      })
    }
    for (const comment of commentsResult.rows) {
      interactions[comment.postId]?.comments.push({
        id: comment.id,
        name: comment.name,
        avatarColor: comment.avatarColor,
        text: comment.text,
        timestamp: comment.createdAt,
      })
    }
    res.json(interactions)
  } catch (err) {
    console.error('Error fetching blog interactions:', err)
    res.status(500).json({ error: 'Failed to fetch interactions' })
  }
})

router.get('/activity', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, type, name, avatarColor AS "avatarColor", postId AS "postId", createdAt AS "createdAt" FROM blogActivity ORDER BY createdAt DESC LIMIT 500',
    )
    res.json(
      result.rows.map(({ createdAt, ...rest }) => ({
        ...rest,
        timestamp: createdAt,
      })),
    )
  } catch (err) {
    console.error('Error fetching blog activity:', err)
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

router.post('/activity', async (req, res) => {
  const type = req.body?.type
  const name = sanitizeName(req.body?.name)
  const avatarColor = sanitizeAvatarColor(req.body?.avatarColor)

  if (!VALID_ACTIVITY_TYPES.includes(type)) {
    return res.status(400).json({ error: 'Invalid type' })
  }
  if (!name) return res.status(400).json({ error: 'Invalid name' })
  if (!avatarColor)
    return res.status(400).json({ error: 'Invalid avatarColor' })

  try {
    const entry = await insertActivity({
      type,
      name,
      avatarColor,
      postId: null,
    })
    res.status(201).json(entry)
  } catch (err) {
    console.error('Error logging blog activity:', err)
    res.status(500).json({ error: 'Failed to log activity' })
  }
})

router.post('/likes/:postId', async (req, res) => {
  const { postId } = req.params
  if (!VALID_POST_IDS.includes(postId)) {
    return res.status(404).json({ error: 'Unknown post' })
  }
  const name = sanitizeName(req.body?.name)
  const avatarColor = sanitizeAvatarColor(req.body?.avatarColor)
  if (!name) return res.status(400).json({ error: 'Invalid name' })
  if (!avatarColor)
    return res.status(400).json({ error: 'Invalid avatarColor' })

  try {
    const deleted = await pool.query(
      'DELETE FROM blogLikes WHERE postId = $1 AND name = $2',
      [postId, name],
    )

    let liked = false
    let activityEntry = null
    if (deleted.rowCount === 0) {
      await pool.query(
        'INSERT INTO blogLikes (postId, name, avatarColor, createdAt) VALUES ($1, $2, $3, $4)',
        [postId, name, avatarColor, new Date().toISOString()],
      )
      liked = true
      activityEntry = await insertActivity({
        type: 'like',
        name,
        avatarColor,
        postId,
      })
    }

    const likesResult = await pool.query(
      'SELECT name, avatarColor AS "avatarColor" FROM blogLikes WHERE postId = $1',
      [postId],
    )
    res.json({ liked, likes: likesResult.rows, activity: activityEntry })
  } catch (err) {
    console.error('Error toggling blog like:', err)
    res.status(500).json({ error: 'Failed to toggle like' })
  }
})

router.post('/comments/:postId', async (req, res) => {
  const { postId } = req.params
  if (!VALID_POST_IDS.includes(postId)) {
    return res.status(404).json({ error: 'Unknown post' })
  }
  const name = sanitizeName(req.body?.name)
  const avatarColor = sanitizeAvatarColor(req.body?.avatarColor)
  const text =
    typeof req.body?.text === 'string'
      ? req.body.text.trim().slice(0, MAX_COMMENT_LENGTH)
      : ''
  if (!name) return res.status(400).json({ error: 'Invalid name' })
  if (!avatarColor)
    return res.status(400).json({ error: 'Invalid avatarColor' })
  if (!text) return res.status(400).json({ error: 'Invalid comment' })

  try {
    await pool.query(
      'INSERT INTO blogComments (postId, name, avatarColor, text, createdAt) VALUES ($1, $2, $3, $4, $5)',
      [postId, name, avatarColor, text, new Date().toISOString()],
    )
    const activityEntry = await insertActivity({
      type: 'comment',
      name,
      avatarColor,
      postId,
    })
    const commentsResult = await pool.query(
      'SELECT id, name, avatarColor AS "avatarColor", text, createdAt AS "createdAt" FROM blogComments WHERE postId = $1 ORDER BY createdAt ASC',
      [postId],
    )
    res.status(201).json({
      comments: commentsResult.rows.map(({ createdAt, ...rest }) => ({
        ...rest,
        timestamp: createdAt,
      })),
      activity: activityEntry,
    })
  } catch (err) {
    console.error('Error adding blog comment:', err)
    res.status(500).json({ error: 'Failed to add comment' })
  }
})

export default router
