import { desktopIcons } from './desktopIcons.js'

const C_DRIVE_APP_IDS = [
  'developer-lab',
  'projects',
  'resume',
  'biography',
  'contact-info',
  'tech-stack',
  'gmail',
]

const D_DRIVE_APP_IDS = [
  'music-lab',
  'games',
  'store',
  'memory-wall',
  'paint',
  'visitor-arts',
  'blog',
  'zoom-chat',
]

function toAppShortcut(id) {
  const icon = desktopIcons.find((entry) => entry.id === id)
  return {
    label: icon.label,
    icon: icon.icon,
    id: icon.id,
    kind: 'app',
    appId: icon.id,
  }
}

export const LOCAL_DISK_C_CHILDREN = C_DRIVE_APP_IDS.map(toAppShortcut)
export const SYSTEM_RESERVED_D_CHILDREN = D_DRIVE_APP_IDS.map(toAppShortcut)
