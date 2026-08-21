import { describe, it, expect, beforeEach } from 'vitest'
import { ensureBlogSeedVersion } from './blogSeedVersion.js'

describe('blogSeedVersion', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('leaves stored blog data alone when the version already matches', () => {
    localStorage.setItem('blog:activity', '[{"id":"keep-me"}]')
    localStorage.setItem('blog:seedVersion', '3')
    ensureBlogSeedVersion(3)
    expect(localStorage.getItem('blog:activity')).toBe('[{"id":"keep-me"}]')
  })

  it('clears stale activity and per-post interaction keys on a version bump', () => {
    localStorage.setItem('blog:activity', '[{"id":"old"}]')
    localStorage.setItem('blog:interactions:blog-1', '{"likes":[]}')
    localStorage.setItem('blog:visitorIdentity', '{"name":"Ada"}')
    localStorage.setItem('blog:seedVersion', '2')

    ensureBlogSeedVersion(3)

    expect(localStorage.getItem('blog:activity')).toBeNull()
    expect(localStorage.getItem('blog:interactions:blog-1')).toBeNull()
    expect(localStorage.getItem('blog:visitorIdentity')).toBe('{"name":"Ada"}')
    expect(localStorage.getItem('blog:seedVersion')).toBe('3')
  })
})
