import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { addToken, removeToken } from '../middleware/requireAuth.js'

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  throw new Error(
    'ADMIN_USERNAME and ADMIN_PASSWORD must both be set — refusing to start with admin auth unconfigured',
  )
}

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body ?? {}

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = randomUUID()
  addToken(token)
  res.json({ token })
})

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (token) removeToken(token)
  res.status(204).end()
})

export default router
