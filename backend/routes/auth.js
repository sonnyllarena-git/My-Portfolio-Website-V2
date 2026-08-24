import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { validTokens } from '../middleware/requireAuth.js'

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
  validTokens.add(token)
  res.json({ token })
})

export default router
