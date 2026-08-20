import { describe, it, expect } from 'vitest'
import { getTimeBucket, getGreeting } from './greeting.js'

describe('getTimeBucket', () => {
  it('maps each boundary hour to the right bucket', () => {
    expect(getTimeBucket(5)).toBe('morning')
    expect(getTimeBucket(11)).toBe('morning')
    expect(getTimeBucket(12)).toBe('afternoon')
    expect(getTimeBucket(16)).toBe('afternoon')
    expect(getTimeBucket(17)).toBe('evening')
    expect(getTimeBucket(20)).toBe('evening')
    expect(getTimeBucket(21)).toBe('night')
    expect(getTimeBucket(4)).toBe('night')
  })
})

describe('getGreeting', () => {
  it('deterministically picks the first template with randomFn returning 0', () => {
    const greeting = getGreeting(9, 'Ada', () => 0)
    expect(greeting).toBe('Good morning, Ada! Ready to chase a new high score?')
  })

  it('deterministically picks the last template with randomFn near 1', () => {
    const greeting = getGreeting(9, 'Ada', () => 0.999)
    expect(greeting).toContain('Ada')
    expect(greeting).not.toContain('{name}')
  })
})
