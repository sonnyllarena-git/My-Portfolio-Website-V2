import { describe, expect, it } from 'vitest'
import { videos, tracks } from './loadMusicLabLibrary.js'

describe('loadMusicLabLibrary', () => {
  it('builds the video library from real content folders', () => {
    expect(videos).toHaveLength(1)
    expect(videos[0].id).toBe('late-night-drive')
    expect(videos[0].mediaSrc).toBeTruthy()
    expect(videos[0].title).toBeTruthy()
  })

  it('builds an empty track library once no track folders remain', () => {
    expect(tracks).toEqual([])
  })
})
