import { describe, it, expect, beforeEach } from 'vitest'
import { readScores, writeTopScores } from './gameScores.js'

describe('gameScores', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('writes then reads back the top scores, sorted', () => {
    writeTopScores(
      'test-game',
      [{ value: 10 }, { value: 30 }, { value: 20 }],
      'desc',
    )
    const scores = readScores('test-game')
    expect(scores.map((s) => s.value)).toEqual([30, 20, 10])
  })

  it('falls back to an empty array when stored data is corrupt', () => {
    localStorage.setItem('arcade:broken-game', '{not valid json')
    expect(readScores('broken-game')).toEqual([])
  })
})
