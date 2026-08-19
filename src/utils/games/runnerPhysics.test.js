import { describe, it, expect } from 'vitest'
import { checkCollision } from './runnerPhysics.js'

describe('checkCollision', () => {
  it('returns true when the player overlaps an obstacle', () => {
    const player = { x: 60, y: 100 }
    const obstacles = [{ x: 60, y: 100, width: 24, height: 32 }]
    expect(checkCollision(player, obstacles)).toBe(true)
  })

  it('returns false when no obstacle is nearby', () => {
    const player = { x: 60, y: 100 }
    const obstacles = [{ x: 500, y: 100, width: 24, height: 32 }]
    expect(checkCollision(player, obstacles)).toBe(false)
  })
})
