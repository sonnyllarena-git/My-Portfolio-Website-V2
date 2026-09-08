export async function fetchMusicLabItems() {
  const response = await fetch('/api/music-lab')
  if (!response.ok) throw new Error('Failed to fetch music lab items')
  const rows = await response.json()
  return rows.map((row) => ({
    id: `db-${row.id}`,
    title: row.title,
    artist: row.artist ?? '',
    album: row.album ?? '',
    duration: row.duration ?? 0,
    mediaSrc: row.mediaUrl,
    thumbnailSrc: row.thumbnailUrl,
    type: row.type,
  }))
}
