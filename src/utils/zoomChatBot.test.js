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
})
