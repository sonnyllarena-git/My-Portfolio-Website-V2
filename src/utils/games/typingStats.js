export function calculateWPM(charsTyped, elapsedMs) {
  if (elapsedMs <= 0) return 0
  const minutes = elapsedMs / 60000
  const words = charsTyped / 5
  return Math.round(words / minutes)
}

export function calculateAccuracy(correctChars, totalTyped) {
  if (totalTyped <= 0) return 100
  return Math.round((correctChars / totalTyped) * 100)
}
