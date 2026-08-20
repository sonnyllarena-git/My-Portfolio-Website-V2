import { describe, it, expect, beforeEach } from 'vitest'
import { readRatings, addRating, getAverageRating } from './gameRatings.js'

describe('gameRatings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('seeds an unknown game with an empty list and persists it', () => {
    const ratings = readRatings('no-such-game')
    expect(ratings).toEqual([])
    expect(localStorage.getItem('arcade:ratings:no-such-game')).toBe('[]')
  })

  it('adds a rating and reads it back', () => {
    addRating('test-game', {
      name: 'Ada',
      rating: 4,
      comment: 'Great game!',
    })
    const ratings = readRatings('test-game')
    expect(ratings).toHaveLength(1)
    expect(ratings[0]).toMatchObject({
      name: 'Ada',
      rating: 4,
      comment: 'Great game!',
    })
  })

  it('falls back to an empty list when stored data is corrupt', () => {
    localStorage.setItem('arcade:ratings:broken-game', '{not valid json')
    expect(readRatings('broken-game')).toEqual([])
  })

  it('computes the average rating and count', () => {
    const ratings = [{ rating: 4 }, { rating: 5 }, { rating: 3 }]
    expect(getAverageRating(ratings)).toEqual({ average: 4, count: 3 })
  })

  it('returns a null average for an empty list', () => {
    expect(getAverageRating([])).toEqual({ average: null, count: 0 })
  })
})
