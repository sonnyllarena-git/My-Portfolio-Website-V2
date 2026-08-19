import { describe, it, expect } from 'vitest'
import { buildShuffledDeck } from './memoryDeck.js'

describe('buildShuffledDeck', () => {
  it('produces a deck twice the icon count with each icon appearing exactly twice', () => {
    const icons = ['a', 'b', 'c', 'd']
    const deck = buildShuffledDeck(icons)

    expect(deck).toHaveLength(icons.length * 2)

    const counts = {}
    for (const card of deck) {
      counts[card.icon] = (counts[card.icon] ?? 0) + 1
    }
    for (const icon of icons) {
      expect(counts[icon]).toBe(2)
    }
  })
})
