const KEY_PREFIX = 'arcade:'
const PLAYS_KEY_PREFIX = 'arcade:plays:'

export function readPlayCount(gameId) {
  try {
    const raw = localStorage.getItem(PLAYS_KEY_PREFIX + gameId)
    const parsed = raw ? Number(raw) : 0
    return Number.isFinite(parsed) ? parsed : 0
  } catch {
    return 0
  }
}

export function incrementPlayCount(gameId) {
  const next = readPlayCount(gameId) + 1
  try {
    localStorage.setItem(PLAYS_KEY_PREFIX + gameId, String(next))
  } catch {
    // localStorage unavailable (e.g. private mode) — count just won't persist
  }
  return next
}

export function readScores(gameId) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + gameId)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeTopScores(gameId, scores, sortOrder, limit = 10) {
  const sorted = [...scores].sort((a, b) =>
    sortOrder === 'asc' ? a.value - b.value : b.value - a.value,
  )
  const top = sorted.slice(0, limit)
  localStorage.setItem(KEY_PREFIX + gameId, JSON.stringify(top))
  return top
}
