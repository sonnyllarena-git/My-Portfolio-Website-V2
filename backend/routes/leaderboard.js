import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

const VALID_GAME_IDS = ['flappy-bird', 'typing-speed', 'memory-flip']
const MAX_SCORE = 1_000_000
const MAX_NAME_LENGTH = 24

router.get('/:gameId', async (req, res) => {
  if (!VALID_GAME_IDS.includes(req.params.gameId)) {
    return res.status(404).json({ error: 'Unknown game' })
  }
  try {
    const result = await pool.query(
      'SELECT name, score, label, createdAt AS "createdAt" FROM leaderboardScores WHERE gameId = $1 ORDER BY score DESC LIMIT 10',
      [req.params.gameId],
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching leaderboard:', err)
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

router.post('/:gameId', async (req, res) => {
  const { gameId } = req.params
  if (!VALID_GAME_IDS.includes(gameId)) {
    return res.status(404).json({ error: 'Unknown game' })
  }

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const score = req.body?.score
  const label =
    typeof req.body?.label === 'string' ? req.body.label.slice(0, 40) : null

  if (!name || name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return res.status(400).json({ error: 'Invalid score' })
  }

  try {
    await pool.query(
      'INSERT INTO leaderboardScores (gameId, name, score, label, createdAt) VALUES ($1, $2, $3, $4, $5)',
      [gameId, name, score, label, new Date().toISOString()],
    )

    await pool.query(
      `DELETE FROM leaderboardScores
       WHERE gameId = $1 AND id NOT IN (
         SELECT id FROM leaderboardScores WHERE gameId = $1 ORDER BY score DESC LIMIT 10
       )`,
      [gameId],
    )

    const result = await pool.query(
      'SELECT name, score, label, createdAt AS "createdAt" FROM leaderboardScores WHERE gameId = $1 ORDER BY score DESC LIMIT 10',
      [gameId],
    )
    res.status(201).json(result.rows)
  } catch (err) {
    console.error('Error submitting leaderboard score:', err)
    res.status(500).json({ error: 'Failed to submit score' })
  }
})

export default router
