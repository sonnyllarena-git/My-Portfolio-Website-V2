import { describe, it, expect, beforeEach } from 'vitest'
import {
  readVisitorName,
  writeVisitorName,
  clearVisitorName,
} from './gameVisitor.js'

describe('gameVisitor', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('writes then reads back the visitor name', () => {
    writeVisitorName('Ada Lovelace')
    expect(readVisitorName()).toBe('Ada Lovelace')
  })

  it('returns null when no name has been stored', () => {
    expect(readVisitorName()).toBeNull()
  })

  it('clears a previously stored name', () => {
    writeVisitorName('Ada Lovelace')
    clearVisitorName()
    expect(readVisitorName()).toBeNull()
  })
})
