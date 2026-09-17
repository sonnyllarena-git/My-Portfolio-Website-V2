import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

const MAX_NAME_LENGTH = 80
const MAX_CONTENT_LENGTH = 2000
const VALID_ROLES = ['bot', 'guest']

// Public — called once per chat message so the transcript is saved as the conversation
// happens, not reconstructed after the fact.
router.post('/', async (req, res) => {
  const sessionId =
    typeof req.body?.sessionId === 'string' ? req.body.sessionId.trim() : ''
  const role = req.body?.role
  const content =
    typeof req.body?.content === 'string'
      ? req.body.content.trim().slice(0, MAX_CONTENT_LENGTH)
      : ''
  const visitorName =
    typeof req.body?.visitorName === 'string'
      ? req.body.visitorName.trim().slice(0, MAX_NAME_LENGTH) || null
      : null
  const visitorEmail =
    typeof req.body?.visitorEmail === 'string'
      ? req.body.visitorEmail.trim().slice(0, MAX_NAME_LENGTH) || null
      : null

  if (!sessionId) return res.status(400).json({ error: 'Invalid sessionId' })
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }
  if (!content) return res.status(400).json({ error: 'Invalid content' })

  try {
    const createdAt = new Date().toISOString()
    await pool.query(
      `INSERT INTO zoomChatMessages
         (sessionId, visitorName, visitorEmail, role, content, createdAt)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [sessionId, visitorName, visitorEmail, role, content, createdAt],
    )
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Error saving Zoom Chat message:', err)
    res.status(500).json({ error: 'Failed to save message' })
  }
})

// Admin — one row per conversation, newest activity first. visitorName/visitorEmail are
// null on a session's earliest rows (before the gate flow collects them), so MAX() picks
// up whichever non-null value that session ends up with.
router.get('/', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sessionId AS "sessionId",
        MAX(visitorName) AS "visitorName",
        MAX(visitorEmail) AS "visitorEmail",
        MIN(createdAt) AS "startedAt",
        MAX(createdAt) AS "lastMessageAt",
        COUNT(*) AS "messageCount"
      FROM zoomChatMessages
      GROUP BY sessionId
      ORDER BY MAX(createdAt) DESC
    `)
    res.json(
      result.rows.map((row) => ({
        ...row,
        messageCount: Number(row.messageCount),
      })),
    )
  } catch (err) {
    console.error('Error fetching Zoom Chat sessions:', err)
    res.status(500).json({ error: 'Failed to fetch conversations' })
  }
})

// Admin — full transcript for one conversation, oldest first (reading order).
router.get('/:sessionId', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, role, content, createdAt AS "createdAt"
       FROM zoomChatMessages
       WHERE sessionId = $1
       ORDER BY createdAt ASC, id ASC`,
      [req.params.sessionId],
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' })
    }
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching Zoom Chat transcript:', err)
    res.status(500).json({ error: 'Failed to fetch transcript' })
  }
})

export default router
