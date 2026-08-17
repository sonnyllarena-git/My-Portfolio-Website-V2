import { describe, it, expect } from 'vitest'
import { rectsIntersect } from './geometry.js'

describe('rectsIntersect', () => {
  it('returns true when two rects overlap', () => {
    const a = { left: 0, top: 0, right: 10, bottom: 10 }
    const b = { left: 5, top: 5, right: 15, bottom: 15 }
    expect(rectsIntersect(a, b)).toBe(true)
  })

  it('returns false when two rects do not overlap', () => {
    const a = { left: 0, top: 0, right: 10, bottom: 10 }
    const b = { left: 20, top: 20, right: 30, bottom: 30 }
    expect(rectsIntersect(a, b)).toBe(false)
  })
})
