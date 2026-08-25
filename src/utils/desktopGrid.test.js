import { describe, it, expect } from 'vitest'
import {
  computeAutoLayout,
  cellToPixel,
  pixelToNearestCell,
} from './desktopGrid.js'

describe('computeAutoLayout', () => {
  it('fills column-major, wrapping into the next column when one fills up', () => {
    const icons = [
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
      { id: 'd' },
      { id: 'e' },
    ]
    const positions = computeAutoLayout(icons, 450)
    expect(positions.a).toEqual({ row: 0, col: 0 })
    expect(positions.c).toEqual({ row: 2, col: 0 })
    expect(positions.d).toEqual({ row: 0, col: 1 })
  })

  it('keeps every icon in its own column when the viewport is too short for one row', () => {
    const icons = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const positions = computeAutoLayout(icons, 50)
    expect(positions).toEqual({
      a: { row: 0, col: 0 },
      b: { row: 0, col: 1 },
      c: { row: 0, col: 2 },
    })
  })
})

describe('cellToPixel / pixelToNearestCell', () => {
  it('round-trips a cell through pixel coordinates', () => {
    const { x, y } = cellToPixel(2, 3)
    expect(pixelToNearestCell(x, y)).toEqual({ row: 2, col: 3 })
  })
})
