import { describe, it, expect, beforeEach } from 'vitest'
import {
  readVisitorIdentity,
  writeVisitorIdentity,
  clearVisitorIdentity,
} from './blogVisitor.js'

describe('blogVisitor', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('writes then reads back the visitor identity', () => {
    writeVisitorIdentity({ name: 'Ada Lovelace', avatarColor: 'sky' })
    expect(readVisitorIdentity()).toEqual({
      name: 'Ada Lovelace',
      avatarColor: 'sky',
    })
  })

  it('returns null when no identity has been stored', () => {
    expect(readVisitorIdentity()).toBeNull()
  })

  it('returns null when stored data is corrupt', () => {
    localStorage.setItem('blog:visitorIdentity', '{not valid json')
    expect(readVisitorIdentity()).toBeNull()
  })

  it('clears a previously stored identity', () => {
    writeVisitorIdentity({ name: 'Ada Lovelace', avatarColor: 'sky' })
    clearVisitorIdentity()
    expect(readVisitorIdentity()).toBeNull()
  })
})
