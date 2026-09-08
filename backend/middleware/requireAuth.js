const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export const validTokens = new Map() // token -> expiresAt (ms epoch)

export function addToken(token) {
  validTokens.set(token, Date.now() + TOKEN_TTL_MS)
}

export function removeToken(token) {
  validTokens.delete(token)
}

function isTokenValid(token) {
  const expiresAt = validTokens.get(token)
  if (!expiresAt) return false
  if (Date.now() > expiresAt) {
    validTokens.delete(token)
    return false
  }
  return true
}

export default function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token || !isTokenValid(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}
