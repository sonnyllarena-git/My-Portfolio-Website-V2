import { describe, it, expect, beforeEach } from 'vitest'
import { readInteractions, toggleLike, addComment } from './blogInteractions.js'

describe('blogInteractions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('seeds an unknown post with empty likes/comments and persists it', () => {
    const data = readInteractions('no-such-post')
    expect(data).toEqual({ likes: [], comments: [] })
    expect(localStorage.getItem('blog:interactions:no-such-post')).toBe(
      JSON.stringify({ likes: [], comments: [] }),
    )
  })

  it('toggles a like on and back off for the same visitor', () => {
    const visitor = { name: 'Ada', avatarColor: 'sky' }
    const liked = toggleLike('post-1', visitor)
    expect(liked).toEqual([visitor])
    const unliked = toggleLike('post-1', visitor)
    expect(unliked).toEqual([])
  })

  it('adds a comment and reads it back', () => {
    addComment('post-1', {
      name: 'Ada',
      avatarColor: 'sky',
      text: 'Great post!',
    })
    const data = readInteractions('post-1')
    expect(data.comments).toHaveLength(1)
    expect(data.comments[0]).toMatchObject({
      name: 'Ada',
      avatarColor: 'sky',
      text: 'Great post!',
    })
  })

  it('falls back to empty likes/comments when stored data is corrupt', () => {
    localStorage.setItem('blog:interactions:broken-post', '{not valid json')
    expect(readInteractions('broken-post')).toEqual({ likes: [], comments: [] })
  })
})
