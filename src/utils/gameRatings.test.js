import { describe, it, expect } from 'vitest'
import { getAverageRating } from './gameRatings.js'

describe('gameRatings', () => {
  it('computes the average rating and count', () => {
    const ratings = [{ rating: 4 }, { rating: 5 }, { rating: 3 }]
    expect(getAverageRating(ratings)).toEqual({ average: 4, count: 3 })
  })

  it('returns a null average for an empty list', () => {
    expect(getAverageRating([])).toEqual({ average: null, count: 0 })
  })
})
