const VISITOR_KEY = 'blog:visitorIdentity'

export function readVisitorIdentity() {
  try {
    const raw = localStorage.getItem(VISITOR_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed &&
      typeof parsed.name === 'string' &&
      typeof parsed.avatarColor === 'string'
      ? parsed
      : null
  } catch {
    return null
  }
}

export function writeVisitorIdentity(identity) {
  try {
    localStorage.setItem(VISITOR_KEY, JSON.stringify(identity))
  } catch {
    // localStorage unavailable (e.g. private mode) — identity just won't persist
  }
}

export function clearVisitorIdentity() {
  try {
    localStorage.removeItem(VISITOR_KEY)
  } catch {
    // localStorage unavailable (e.g. private mode) — nothing to clear
  }
}
