export const quickAccess = [
  { label: 'Desktop', icon: '🖥️', id: 'desktop' },
  { label: 'Downloads', icon: '⬇️', id: 'downloads' },
  { label: 'Visitor Arts', icon: '🖼️', id: 'visitor-arts' },
  { label: 'Pictures', icon: '🖼️', id: 'pictures' },
]

export const pcDrives = [
  { label: 'C Drive', icon: '💽', id: 'local-disk-c' },
  { label: 'D Drive', icon: '💽', id: 'local-disk-d' },
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
