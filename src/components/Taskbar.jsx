import { useState } from 'react'
import SystemTray from './SystemTray.jsx'

function TaskbarButton({ icon, label }) {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      onClick={() => setIsActive((prev) => !prev)}
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded text-lg text-white ${
        isActive ? 'bg-white/20' : 'hover:bg-white/10'
      }`}
    >
      {icon}
    </button>
  )
}

const leftLaunchers = [
  { id: 'start', label: 'Start', icon: '⊞' },
  { id: 'widgets', label: 'Widgets', icon: '▤' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'explorer', label: 'File Explorer', icon: '📁' },
]

const pinnedApps = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'terminal', label: 'Terminal', icon: '⌨️' },
  { id: 'messaging', label: 'Messaging', icon: '💬' },
]

function Taskbar() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-12 items-center gap-1 border-t border-white/10 bg-black/40 px-2 backdrop-blur-md">
      {leftLaunchers.map((item) => (
        <TaskbarButton key={item.id} icon={item.icon} label={item.label} />
      ))}
      <div className="ml-4 flex items-center gap-1">
        {pinnedApps.map((item) => (
          <TaskbarButton key={item.id} icon={item.icon} label={item.label} />
        ))}
      </div>
      <SystemTray />
    </div>
  )
}

export default Taskbar
