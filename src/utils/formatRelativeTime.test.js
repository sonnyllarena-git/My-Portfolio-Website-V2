import { describe, it, expect } from 'vitest'
import { formatRelativeTime } from './formatRelativeTime.js'

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60000).toISOString()
}

describe('formatRelativeTime', () => {
  it('formats a timestamp from a few minutes ago', () => {
    expect(formatRelativeTime(minutesAgo(5))).toBe('5m')
  })

  it('formats a timestamp from a few hours ago', () => {
    expect(formatRelativeTime(minutesAgo(4 * 60))).toBe('4h')
  })

  it('formats a timestamp from several days ago', () => {
    expect(formatRelativeTime(minutesAgo(3 * 24 * 60))).toBe('3d')
  })

  it('returns "Just now" for a timestamp seconds ago', () => {
    expect(formatRelativeTime(new Date().toISOString())).toBe('Just now')
  })
})
