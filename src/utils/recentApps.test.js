import { describe, it, expect } from 'vitest'
import { addRecentAppId } from './recentApps.js'

describe('addRecentAppId', () => {
  it('prepends a new id in front of the existing list', () => {
    expect(addRecentAppId(['b', 'c'], 'a')).toEqual(['a', 'b', 'c'])
  })

  it('moves an already-recent id to the front without duplicating it', () => {
    expect(addRecentAppId(['a', 'b', 'c'], 'b')).toEqual(['b', 'a', 'c'])
  })

  it('drops the oldest id once the list exceeds maxLength', () => {
    const full = ['a', 'b', 'c', 'd', 'e', 'f']
    expect(addRecentAppId(full, 'g')).toEqual(['g', 'a', 'b', 'c', 'd', 'e'])
  })
})
