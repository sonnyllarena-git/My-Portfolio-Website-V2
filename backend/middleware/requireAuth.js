import { pool } from '../db.js'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// Stored in Postgres, not in-memory: on Vercel, different requests can land on
// different serverless instances that don't share process memory, so a token
// issued by /login on one instance would never be recognized by a later
// request handled by another — the admin panel would open then immediately
// close itself the moment its first authenticated fetch 401'd.
export async function addToken(token) {
  await pool.query(
    'INSERT INTO adminSessions (token, expiresAt) VALUES ($1, $2)',
    [token, Date.now() + TOKEN_TTL_MS],
  )
}

export async function removeToken(token) {
  await pool.query('DELETE FROM adminSessions WHERE token = $1', [token])
}

async function isTokenValid(token) {
  const result = await pool.query(
    'SELECT expiresAt AS "expiresAt" FROM adminSessions WHERE token = $1',
    [token],
  )
  if (result.rows.length === 0) return false
  const expiresAt = Number(result.rows[0].expiresAt)
  if (Date.now() > expiresAt) {
    await pool.query('DELETE FROM adminSessions WHERE token = $1', [token])
    return false
  }
  return true
}

export default async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token || !(await isTokenValid(token))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}
