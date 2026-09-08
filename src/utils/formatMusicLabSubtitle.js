export function formatMusicLabSubtitle(item) {
  if (!item) return ''
  const { artist, album } = item
  if (artist && album) return `${artist} - ${album}`
  return artist || album || ''
}
