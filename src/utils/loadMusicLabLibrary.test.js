import { describe, expect, it } from 'vitest'
import { videos, tracks } from './loadMusicLabLibrary.js'

describe('loadMusicLabLibrary', () => {
  it('builds the video library from real content folders', () => {
    expect(videos).toHaveLength(1)
    expect(videos[0].id).toBe('late-night-drive')
    expect(videos[0].mediaSrc).toBeTruthy()
    expect(videos[0].title).toBeTruthy()
  })

  it('builds the track library sorted by folder slug', () => {
    expect(tracks.map((t) => t.id)).toEqual([
      'coffee-and-commits',
      'focus-mode',
      'late-night-code',
    ])
    expect(tracks[1].title).toBe('Focus Mode')
    expect(tracks[1].album).toBe("Sonny's Playlist")
    expect(tracks[1].duration).toBe(214)
    expect(tracks[1].mediaSrc).toBeNull()
  })
})
