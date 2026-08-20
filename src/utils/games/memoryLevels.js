export function pairsForLevel(level) {
  return 2 * level
}

export function boardPairsForLevel(level, iconPoolSize, maxPairs = 32) {
  return Math.min(pairsForLevel(level), iconPoolSize, maxPairs)
}
