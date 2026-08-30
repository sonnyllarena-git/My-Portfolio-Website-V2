import { describe, it, expect } from 'vitest'
import { generateTemplateCode } from './resumeTemplateCode.js'

describe('generateTemplateCode', () => {
  it('formats an id as a zero-padded TPL code', () => {
    expect(generateTemplateCode(1)).toBe('TPL-0001')
    expect(generateTemplateCode(42)).toBe('TPL-0042')
  })
})
