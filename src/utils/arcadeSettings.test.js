import { describe, it, expect, beforeEach } from 'vitest'
import { readArcadeSettings, writeArcadeSettings } from './arcadeSettings.js'

describe('arcadeSettings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the defaults when nothing is stored', () => {
    expect(readArcadeSettings()).toEqual({
      soundMuted: false,
      backgroundId: 'midnight',
    })
  })

  it('writes then reads back a partial update, merged with existing settings', () => {
    writeArcadeSettings({ soundMuted: true })
    writeArcadeSettings({ backgroundId: 'sunset' })
    expect(readArcadeSettings()).toEqual({
      soundMuted: true,
      backgroundId: 'sunset',
    })
  })

  it('falls back to the defaults when stored data is corrupt', () => {
    localStorage.setItem('arcade:settings', '{not valid json')
    expect(readArcadeSettings()).toEqual({
      soundMuted: false,
      backgroundId: 'midnight',
    })
  })
})
