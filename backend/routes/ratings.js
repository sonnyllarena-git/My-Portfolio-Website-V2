import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

const VALID_GAME_IDS = ['flappy-bird', 'typing-speed', 'memory-flip']
const MAX_NAME_LENGTH = 24
const MAX_COMMENT_LENGTH = 300

router.get('/:gameId', async (req, res) => {
  if (!VALID_GAME_IDS.includes(req.params.gameId)) {
    return res.status(404).json({ error: 'Unknown game' })
  }
  try {
    const result = await pool.query(
      'SELECT id, name, rating, comment, createdAt AS "createdAt" FROM gameRatings WHERE gameId = $1 ORDER BY createdAt DESC',
      [req.params.gameId],
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching ratings:', err)
    res.status(500).json({ error: 'Failed to fetch ratings' })
  }
})

router.post('/:gameId', async (req, res) => {
  const { gameId } = req.params
  if (!VALID_GAME_IDS.includes(gameId)) {
    return res.status(404).json({ error: 'Unknown game' })
  }

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const rating = req.body?.rating
  const comment =
    typeof req.body?.comment === 'string'
      ? req.body.comment.trim().slice(0, MAX_COMMENT_LENGTH)
      : ''

  if (!name || name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating' })
  }

  try {
    await pool.query(
      'INSERT INTO gameRatings (gameId, name, rating, comment, createdAt) VALUES ($1, $2, $3, $4, $5)',
      [gameId, name, rating, comment, new Date().toISOString()],
    )

    const result = await pool.query(
      'SELECT id, name, rating, comment, createdAt AS "createdAt" FROM gameRatings WHERE gameId = $1 ORDER BY createdAt DESC',
      [gameId],
    )
    res.status(201).json(result.rows)
  } catch (err) {
    console.error('Error submitting rating:', err)
    res.status(500).json({ error: 'Failed to submit rating' })
  }
})

export default router
