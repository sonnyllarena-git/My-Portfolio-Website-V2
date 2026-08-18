const videoMedia = import.meta.glob('../assets/music-lab/videos/*/media.*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const videoThumbs = import.meta.glob(
  '../assets/music-lab/videos/*/thumbnail.*',
  { eager: true, query: '?url', import: 'default' },
)
const videoNotes = import.meta.glob('../assets/music-lab/videos/*/notes.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const trackMedia = import.meta.glob('../assets/music-lab/tracks/*/media.*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const trackThumbs = import.meta.glob(
  '../assets/music-lab/tracks/*/thumbnail.*',
  { eager: true, query: '?url', import: 'default' },
)
const trackNotes = import.meta.glob('../assets/music-lab/tracks/*/notes.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function slugFromPath(path, folder) {
  return path.match(new RegExp(`/${folder}/([^/]+)/`))?.[1]
}

function parseNotes(raw) {
  const fields = {}
  raw.split('\n').forEach((line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (match) fields[match[1].trim().toLowerCase()] = match[2].trim()
  })
  return fields
}

function parseDuration(text) {
  if (!text) return 0
  const [mins, secs] = text.split(':').map(Number)
  return (mins || 0) * 60 + (secs || 0)
}

function findBySlug(files, folder, slug) {
  const path = Object.keys(files).find((p) => slugFromPath(p, folder) === slug)
  return path ? files[path] : null
}

function buildLibrary(folder, mediaFiles, thumbFiles, notesFiles) {
  const slugs = new Set(
    [...Object.keys(mediaFiles), ...Object.keys(notesFiles)]
      .map((p) => slugFromPath(p, folder))
      .filter(Boolean),
  )

  return Array.from(slugs)
    .sort()
    .map((slug) => {
      const rawNotes = findBySlug(notesFiles, folder, slug)
      const notes = rawNotes ? parseNotes(rawNotes) : {}
      return {
        id: slug,
        title: notes.title ?? slug,
        album: notes.album ?? '',
        duration: parseDuration(notes.duration),
        mediaSrc: findBySlug(mediaFiles, folder, slug),
        thumbnailSrc: findBySlug(thumbFiles, folder, slug),
      }
    })
}

export const videos = buildLibrary(
  'videos',
  videoMedia,
  videoThumbs,
  videoNotes,
)
export const tracks = buildLibrary(
  'tracks',
  trackMedia,
  trackThumbs,
  trackNotes,
)
