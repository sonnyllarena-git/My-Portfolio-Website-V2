import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

const MAX_NAME_LENGTH = 40
const MAX_MESSAGE_LENGTH = 420

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, message, rating, createdAt AS "createdAt" FROM memoryWallNotes ORDER BY createdAt DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching memory wall notes:', err)
    res.status(500).json({ error: 'Failed to fetch notes' })
  }
})

router.post('/', async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const message =
    typeof req.body?.message === 'string' ? req.body.message.trim() : ''
  const rating = req.body?.rating

  if (!name || name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Invalid name' })
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Invalid message' })
  }
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Invalid rating' })
  }

  try {
    await pool.query(
      'INSERT INTO memoryWallNotes (name, message, rating, createdAt) VALUES ($1, $2, $3, $4)',
      [name, message, rating, new Date().toISOString()],
    )
    const result = await pool.query(
      'SELECT id, name, message, rating, createdAt AS "createdAt" FROM memoryWallNotes ORDER BY createdAt DESC',
    )
    res.status(201).json(result.rows)
  } catch (err) {
    console.error('Error posting memory wall note:', err)
    res.status(500).json({ error: 'Failed to post note' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const result = await pool.query(
      'DELETE FROM memoryWallNotes WHERE id = $1',
      [id],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Note not found' })
    }
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting memory wall note:', err)
    res.status(500).json({ error: 'Failed to delete note' })
  }
})

export default router
