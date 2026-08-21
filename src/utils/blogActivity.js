const ACTIVITY_KEY = 'blog:activity'
const MAX_ENTRIES = 200

function readStoredActivity() {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeActivity(entries) {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(entries))
  return entries
}

export function readActivityLog(seedFallback = []) {
  const stored = readStoredActivity()
  if (stored) return stored
  return writeActivity(seedFallback)
}

export function logActivity({ type, name, avatarColor, postId = null }) {
  const entry = {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    name,
    avatarColor,
    postId,
    timestamp: new Date().toISOString(),
  }
  const current = readStoredActivity() ?? []
  const updated = [entry, ...current].slice(0, MAX_ENTRIES)
  return writeActivity(updated)
}
