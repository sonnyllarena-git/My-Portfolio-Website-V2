import { describe, it, expect } from 'vitest'
import { boardPairsForLevel } from './memoryLevels.js'

describe('boardPairsForLevel', () => {
  it('uses the raw level formula below the cap', () => {
    expect(boardPairsForLevel(3, 20, 32)).toBe(6)
  })

  it('caps at the icon pool size once the level formula exceeds it', () => {
    expect(boardPairsForLevel(20, 10, 32)).toBe(10)
  })
})
