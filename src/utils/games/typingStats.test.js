import { describe, it, expect } from 'vitest'
import { calculateWPM, calculateAccuracy } from './typingStats.js'

describe('calculateWPM', () => {
  it('computes words per minute from characters typed and elapsed time', () => {
    // 50 chars = 10 words, typed in 30 seconds -> 20 WPM
    expect(calculateWPM(50, 30000)).toBe(20)
  })
})

describe('calculateAccuracy', () => {
  it('computes the percentage of correctly typed characters', () => {
    expect(calculateAccuracy(45, 50)).toBe(90)
  })
})
