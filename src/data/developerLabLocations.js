import {
  LOCAL_DISK_C_CHILDREN,
  SYSTEM_RESERVED_D_CHILDREN,
} from './diskContents.js'

export const quickAccess = [
  { label: 'Desktop', icon: '🖥️', id: 'desktop' },
  { label: 'Downloads', icon: '⬇️', id: 'downloads' },
  { label: 'Visitor Arts', icon: '🖼️', id: 'visitor-arts' },
  { label: 'Pictures', icon: '🖼️', id: 'pictures' },
]

export const pcDrives = [
  {
    label: 'Local Disk (C:)',
    icon: '💽',
    id: 'local-disk-c',
    children: LOCAL_DISK_C_CHILDREN,
  },
  {
    label: 'New Volume (D:)',
    icon: '💽',
    id: 'local-disk-d',
    children: SYSTEM_RESERVED_D_CHILDREN,
  },
]

export const folders = [
  {
    label: 'Projects',
    icon: '📁',
    children: [
      { label: 'Onboarding App', icon: '📁' },
      { label: 'Dental Clinic System', icon: '📁' },
      { label: 'Expense Tracker Mobile App', icon: '📁' },
      { label: 'Restaurant POS System', icon: '📁' },
      { label: 'Jira Dashboard', icon: '📁' },
      { label: 'SOP Site', icon: '📁' },
      { label: 'AI Automations', icon: '📁' },
      {
        label: 'Projects',
        icon: '🗃️',
        id: 'projects',
        kind: 'app',
        appId: 'projects-compilation',
      },
    ],
  },
  { label: 'Tech Stack', icon: '🧰', id: 'tech-stack' },
  { label: 'Resume', icon: 'pdf' },
]

export const drives = [
  {
    label: 'Local Disk (C:)',
    freeGb: 142,
    totalGb: 476,
    id: 'local-disk-c',
    children: LOCAL_DISK_C_CHILDREN,
  },
  {
    label: 'New Volume (D:)',
    freeGb: 2,
    totalGb: 15,
    id: 'local-disk-d',
    children: SYSTEM_RESERVED_D_CHILDREN,
  },
]
