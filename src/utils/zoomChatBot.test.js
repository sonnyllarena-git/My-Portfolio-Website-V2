import { describe, expect, it } from 'vitest'
import { getBotReply } from './zoomChatBot.js'

describe('zoomChatBot', () => {
  it('matches a pricing question to the pricing category', () => {
    const reply = getBotReply('How much does a project cost?')
    expect(reply.matched).toBe(true)
    expect(reply.category.id).toBe('pricing')
  })

  it('falls back when no category keyword matches', () => {
    const reply = getBotReply('asdkjqwoieuqwoiue')
    expect(reply.matched).toBe(false)
    expect(reply.category).toBeNull()
    expect(reply.suggestions).toBeTruthy()
  })

  it('matches a bio question to the about category instead of falling back', () => {
    const reply = getBotReply('Tell me about yourself')
    expect(reply.matched).toBe(true)
    expect(reply.category.id).toBe('about')
  })

  it('does not match a single-word keyword as a substring inside another word', () => {
    const reply = getBotReply('Can I hire you for a project?')
    expect(reply.matched).toBe(true)
    expect(reply.category.id).toBe('hire')
  })

  it('routes a process question to process instead of the generic services catch-all', () => {
    const reply = getBotReply('Do you follow agile?')
    expect(reply.matched).toBe(true)
    expect(reply.category.id).toBe('process')
  })
})
