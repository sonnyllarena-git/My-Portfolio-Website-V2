import { describe, it, expect } from 'vitest'
import { move, isGameOver } from './twenty48Logic.js'

describe('move', () => {
  it('merges equal adjacent tiles toward the move direction and scores the merge', () => {
    const grid = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    const result = move(grid, 'left')
    expect(result.grid[0]).toEqual([4, 0, 0, 0])
    expect(result.scoreDelta).toBe(4)
    expect(result.moved).toBe(true)
  })

  it('reports no move when nothing can shift', () => {
    const grid = [
      [2, 4, 8, 16],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    const result = move(grid, 'left')
    expect(result.moved).toBe(false)
  })
})

describe('isGameOver', () => {
  it('returns true when the grid is full with no adjacent equal tiles', () => {
    const grid = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]
    expect(isGameOver(grid)).toBe(true)
  })
})
