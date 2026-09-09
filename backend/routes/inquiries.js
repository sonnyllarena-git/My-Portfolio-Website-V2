import { Router } from 'express'
import { pool } from '../db.js'
import requireAuth from '../middleware/requireAuth.js'
import { sendInquiryNotification } from '../resendClient.js'

const router = Router()

const MAX_NAME_LENGTH = 80
const MAX_SUBJECT_LENGTH = 150
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const submissionsByIp = new Map() // ip -> { count, windowStart }

function isRateLimited(ip) {
  const now = Date.now()
  const entry = submissionsByIp.get(ip)
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    submissionsByIp.set(ip, { count: 1, windowStart: now })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

router.post('/', async (req, res) => {
  // Honeypot — a hidden field real visitors never fill in. A bot that auto-fills every
  // field trips it; respond exactly like a real success so it doesn't learn to skip it.
  if (typeof req.body?.website === 'string' && req.body.website.trim()) {
    return res.status(201).json({ ok: true })
  }

  if (isRateLimited(req.ip)) {
    return res
      .status(429)
      .json({ error: 'Too many inquiries — try again later' })
  }

  const name =
    typeof req.body?.name === 'string'
      ? req.body.name.trim().slice(0, MAX_NAME_LENGTH)
      : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  const subject =
    typeof req.body?.subject === 'string'
      ? req.body.subject.trim().slice(0, MAX_SUBJECT_LENGTH)
      : ''
  const message =
    typeof req.body?.message === 'string'
      ? req.body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
      : ''

  if (!name) return res.status(400).json({ error: 'Invalid name' })
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (!subject) return res.status(400).json({ error: 'Invalid subject' })
  if (!message) return res.status(400).json({ error: 'Invalid message' })

  try {
    const createdAt = new Date().toISOString()
    const result = await pool.query(
      `INSERT INTO contactInquiries (name, email, subject, message, read, createdAt)
       VALUES ($1, $2, $3, $4, false, $5)
       RETURNING id, name, email, subject, message, read, createdAt AS "createdAt"`,
      [name, email, subject, message, createdAt],
    )

    sendInquiryNotification({ name, email, subject, message }).catch((err) =>
      console.error('Failed to send inquiry notification email:', err),
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error saving inquiry:', err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

router.get('/', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, subject, message, read, createdAt AS "createdAt" FROM contactInquiries ORDER BY createdAt DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching inquiries:', err)
    res.status(500).json({ error: 'Failed to fetch inquiries' })
  }
})

router.patch('/:id/read', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const result = await pool.query(
      `UPDATE contactInquiries SET read = true WHERE id = $1
       RETURNING id, name, email, subject, message, read, createdAt AS "createdAt"`,
      [id],
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Error marking inquiry as read:', err)
    res.status(500).json({ error: 'Failed to update inquiry' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  try {
    const result = await pool.query(
      'DELETE FROM contactInquiries WHERE id = $1',
      [id],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting inquiry:', err)
    res.status(500).json({ error: 'Failed to delete inquiry' })
  }
})

export default router
