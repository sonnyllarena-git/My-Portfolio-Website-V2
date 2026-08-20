const VISITOR_NAME_KEY = 'arcade:visitorName'

export function readVisitorName() {
  try {
    return localStorage.getItem(VISITOR_NAME_KEY)
  } catch {
    return null
  }
}

export function writeVisitorName(name) {
  try {
    localStorage.setItem(VISITOR_NAME_KEY, name)
  } catch {
    // localStorage unavailable (e.g. private mode) — name just won't persist
  }
}

export function clearVisitorName() {
  try {
    localStorage.removeItem(VISITOR_NAME_KEY)
  } catch {
    // localStorage unavailable (e.g. private mode) — nothing to clear
  }
}
