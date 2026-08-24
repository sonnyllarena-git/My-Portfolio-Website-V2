import { describe, it, expect } from 'vitest'
import { generateProductCode, stripImmutableFields } from './productCode.js'

describe('generateProductCode', () => {
  it('formats an id as a zero-padded PRD code', () => {
    expect(generateProductCode(1)).toBe('PRD-0001')
    expect(generateProductCode(42)).toBe('PRD-0042')
  })
})

describe('stripImmutableFields', () => {
  it('passes editable fields through unchanged', () => {
    expect(stripImmutableFields({ name: 'Hoodie', price: 1750 })).toEqual({
      name: 'Hoodie',
      price: 1750,
    })
  })

  it('drops a client-supplied code and id so an update can never overwrite them', () => {
    const result = stripImmutableFields({
      code: 'PRD-9999',
      id: 999,
      name: 'Hoodie',
    })
    expect(result).toEqual({ name: 'Hoodie' })
  })
})
