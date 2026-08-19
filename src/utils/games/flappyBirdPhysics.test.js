import { describe, it, expect } from 'vitest'
import { checkCollision } from './flappyBirdPhysics.js'

describe('checkCollision', () => {
  it('returns false when the bird is inside a pipe gap', () => {
    const bird = { x: 100, y: 200 }
    const pipes = [{ x: 90, gapCenter: 200, gapSize: 120, passed: false }]
    expect(checkCollision(bird, pipes, 600)).toBe(false)
  })

  it('returns true when the bird hits a pipe wall', () => {
    const bird = { x: 100, y: 100 }
    const pipes = [{ x: 90, gapCenter: 300, gapSize: 120, passed: false }]
    expect(checkCollision(bird, pipes, 600)).toBe(true)
  })
})
