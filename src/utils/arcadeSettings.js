const SETTINGS_KEY = 'arcade:settings'

const DEFAULT_SETTINGS = { soundMuted: false, backgroundId: 'midnight' }

export function readArcadeSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function writeArcadeSettings(partial) {
  const updated = { ...readArcadeSettings(), ...partial }
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated))
  } catch {
    // localStorage unavailable (e.g. private mode) — settings just won't persist
  }
  return updated
}
