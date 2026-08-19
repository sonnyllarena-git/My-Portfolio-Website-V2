const KEY_PREFIX = 'arcade:'

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
