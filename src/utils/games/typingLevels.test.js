import { describe, it, expect } from 'vitest'
import { getLevelInfo, isTierStart } from './typingLevels.js'
import { typingTiers } from '../../data/typingTiers.js'

describe('getLevelInfo', () => {
  it('looks up the correct tier and sentence for a known level', () => {
    const info = getLevelInfo(1)
    expect(info.tierName).toBe(typingTiers[0].name)
    expect(info.sentence).toBe(typingTiers[0].sentences[0])
  })
})

describe('isTierStart', () => {
  it('is true at a tier boundary and false mid-tier', () => {
    expect(isTierStart(11)).toBe(true)
    expect(isTierStart(15)).toBe(false)
    expect(isTierStart(1)).toBe(false)
  })
})
