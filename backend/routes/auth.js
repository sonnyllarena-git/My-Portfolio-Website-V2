import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import requireAuth, {
  addToken,
  removeToken,
} from '../middleware/requireAuth.js'
import { pool } from '../db.js'
import { hashPassword, verifyPassword } from '../passwordHash.js'

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error(
    'ADMIN_USERNAME and ADMIN_PASSWORD must both be set — refusing to start with admin auth unconfigured',
  )
}

const router = Router()

const MIN_PASSWORD_LENGTH = 8

// A changed password lives in the DB (adminCredentials, single row) so it survives without a
// redeploy; until it's ever changed, that table is empty and this falls back to the env var —
// the same bootstrap credential auth already required at startup.
async function checkPassword(password) {
  const result = await pool.query(
    'SELECT passwordHash FROM adminCredentials WHERE id = 1',
  )
  if (result.rows.length === 0) {
    return password === process.env.ADMIN_PASSWORD
  }
  return verifyPassword(password, result.rows[0].passwordhash)
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body ?? {}

    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    if (!(await checkPassword(password ?? ''))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = randomUUID()
    addToken(token)
    res.json({ token })
  } catch (err) {
    console.error('Error during login:', err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {}

    if (!(await checkPassword(currentPassword ?? ''))) {
      // 400, not 401 — the request's own bearer token is valid (requireAuth already passed);
      // this is a rejected form field, not an expired session, and the frontend's apiFetch
      // treats any 401 as "log the admin out," which would be wrong here.
      return res.status(400).json({ error: 'Current password is incorrect' })
    }
    if (
      typeof newPassword !== 'string' ||
      newPassword.length < MIN_PASSWORD_LENGTH
    ) {
      return res.status(400).json({
        error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      })
    }

    const now = new Date().toISOString()
    await pool.query(
      `INSERT INTO adminCredentials (id, passwordHash, updatedAt) VALUES (1, $1, $2)
       ON CONFLICT (id) DO UPDATE SET passwordHash = $1, updatedAt = $2`,
      [hashPassword(newPassword), now],
    )
    res.status(204).end()
  } catch (err) {
    console.error('Error changing password:', err)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (token) removeToken(token)
  res.status(204).end()
})

export default router
