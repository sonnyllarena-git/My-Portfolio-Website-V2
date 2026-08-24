export const validTokens = new Set()

export default function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}
