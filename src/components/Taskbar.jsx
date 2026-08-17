import { useState } from 'react'
import SystemTray from './SystemTray.jsx'
import { iconImages } from '../assets/icons/index.js'

function IconGlyph({ id, icon }) {
  return iconImages[id] ? (
    <img src={iconImages[id]} alt="" className="h-5 w-5 object-contain" />
  ) : (
    icon
  )
}

function TaskbarButton({ id, icon, label }) {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      onClick={() => setIsActive((prev) => !prev)}
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded text-lg text-white ${
        isActive ? 'bg-white/20' : 'hover:bg-white/10'
      }`}
    >
      <IconGlyph id={id} icon={icon} />
    </button>
  )
}

function RunningAppButton({ id, icon, label, isMinimized, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded text-lg text-white ${
        isMinimized
          ? 'bg-white/5 hover:bg-white/10'
          : 'bg-white/20 hover:bg-white/30'
      }`}
    >
      <IconGlyph id={id} icon={icon} />
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

function Taskbar({ openWindows = [], onWindowClick }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-12 items-center gap-1 border-t border-white/10 bg-black/40 px-2 backdrop-blur-md">
      {leftLaunchers.map((item) => (
        <TaskbarButton
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
        />
      ))}
      <div className="ml-4 flex items-center gap-1">
        {pinnedApps.map((item) => (
          <TaskbarButton
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
      {openWindows.length > 0 && (
        <div className="ml-4 flex items-center gap-1 border-l border-white/10 pl-4">
          {openWindows.map((w) => (
            <RunningAppButton
              key={w.id}
              id={w.id}
              icon={w.icon}
              label={w.label}
              isMinimized={w.isMinimized}
              onClick={() => onWindowClick(w.id)}
            />
          ))}
        </div>
      )}
      <SystemTray />
    </div>
  )
}

export default Taskbar
