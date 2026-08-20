function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function pickRandomIcons(pool, count) {
  return shuffle(pool).slice(0, count)
}

export function buildShuffledDeck(icons) {
  const pairs = icons.flatMap((icon, index) => [
    { id: `${index}-a`, icon, isFlipped: false, isMatched: false },
    { id: `${index}-b`, icon, isFlipped: false, isMatched: false },
  ])
  return shuffle(pairs)
}
