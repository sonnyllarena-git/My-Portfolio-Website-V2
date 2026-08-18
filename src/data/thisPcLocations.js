export const ROOT_LOCATION = { type: 'root', label: 'This PC' }

export const quickAccess = [
  { label: 'Desktop', icon: '🖥️', id: 'desktop' },
  { label: 'Downloads', icon: '⬇️', id: 'downloads' },
  { label: 'Documents', icon: '📄' },
  { label: 'Pictures', icon: '🖼️', id: 'pictures' },
  { label: 'Music', icon: '🎵', id: 'music-folder' },
  { label: 'Videos', icon: '🎬', id: 'videos' },
]

export const thisPcDrives = [
  { label: 'Local Disk (C:)', icon: '💽', id: 'local-disk-c' },
]

export const drives = [
  { label: 'Local Disk (C:)', freeGb: 142, totalGb: 476, id: 'local-disk-c' },
  { label: 'System Reserved (D:)', freeGb: 2, totalGb: 15, id: 'local-disk-d' },
]
