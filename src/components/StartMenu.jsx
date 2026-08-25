import { useState } from 'react'
import { motion } from 'framer-motion'
import { iconImages } from '../assets/icons/index.js'
import { desktopIcons } from '../data/desktopIcons.js'
import { useIsMobile } from '../hooks/useIsMobile.js'
import AppGlyph from './icons/AppGlyph.jsx'

const POWER_OPTIONS = ['Sleep', 'Restart', 'Shut down']

const sortedApps = [...desktopIcons].sort((a, b) =>
  a.label.localeCompare(b.label),
)

const groupedApps = sortedApps.reduce((groups, icon) => {
  const letter = /[a-zA-Z]/.test(icon.label[0])
    ? icon.label[0].toUpperCase()
    : '#'
  const lastGroup = groups.at(-1)
  if (lastGroup?.letter === letter) {
    lastGroup.items.push(icon)
  } else {
    groups.push({ letter, items: [icon] })
  }
  return groups
}, [])

const panelMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.96 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

function StartMenuPowerFlyout({ onSelect }) {
  return (
    <div className="absolute bottom-12 left-2 z-10 w-36 rounded-lg border border-white/10 bg-[#2a2a2a] p-1 shadow-xl">
      {POWER_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={onSelect}
          className="w-full rounded px-2 py-1.5 text-left text-sm text-white hover:bg-white/10"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function StartMenu({
  onClose,
  onOpenApp,
  onIconContextMenu,
  recentAppIds = [],
}) {
  const isMobile = useIsMobile()
  const [isPowerOpen, setIsPowerOpen] = useState(false)

  const recentApps = recentAppIds
    .map((id) => desktopIcons.find((icon) => icon.id === id))
    .filter(Boolean)

  function handleOpen(id) {
    onOpenApp(id)
    onClose()
  }

  return (
    <motion.div
      {...panelMotion}
      style={{ transformOrigin: 'bottom left' }}
      className={
        isMobile
          ? 'absolute bottom-full inset-x-0 mb-0 flex h-[75vh] overflow-hidden border border-white/10 bg-[#1f1f1f]/95 text-white shadow-2xl backdrop-blur-md'
          : 'absolute bottom-full left-0 flex h-[560px] w-[760px] max-h-[70vh] overflow-hidden border border-white/10 bg-[#1f1f1f]/95 text-white shadow-2xl backdrop-blur-md'
      }
    >
      <div className="relative flex w-14 shrink-0 flex-col items-center justify-end gap-2 border-r border-white/10 py-4">
        <button
          type="button"
          onClick={() => handleOpen('settings')}
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded hover:bg-white/10"
        >
          <img src={iconImages.settings} alt="" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setIsPowerOpen((prev) => !prev)}
          aria-label="Power"
          className="flex h-9 w-9 items-center justify-center rounded hover:bg-white/10"
        >
          <img src={iconImages.power} alt="" className="h-5 w-5" />
        </button>
        {isPowerOpen && (
          <StartMenuPowerFlyout
            onSelect={() => {
              setIsPowerOpen(false)
              onClose()
            }}
          />
        )}
      </div>

      <div className="scrollbar-overlay min-w-0 flex-1 overflow-y-auto px-3 py-3">
        {groupedApps.map((group) => (
          <div key={group.letter}>
            <p className="px-2 pt-2 text-xs font-semibold text-white/40">
              {group.letter}
            </p>
            {group.items.map((icon) => (
              <button
                key={icon.id}
                type="button"
                onClick={() => handleOpen(icon.id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onIconContextMenu?.(icon.id, e.clientX, e.clientY)
                }}
                className="flex w-full items-center gap-3 rounded px-2 py-1.5 text-left hover:bg-white/10"
              >
                <AppGlyph id={icon.id} icon={icon.icon} className="h-5 w-5" />
                <span className="text-sm">{icon.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="scrollbar-overlay w-[220px] shrink-0 overflow-y-auto border-l border-white/10 px-3 py-3 md:w-[420px]">
        <p className="mb-2 text-xs font-semibold text-white/50">
          Recently used
        </p>
        {recentApps.length === 0 ? (
          <p className="text-xs text-white/40">
            Apps you open will show up here.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {recentApps.map((icon) => (
              <button
                key={icon.id}
                type="button"
                onClick={() => handleOpen(icon.id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onIconContextMenu?.(icon.id, e.clientX, e.clientY)
                }}
                className="flex flex-col items-center gap-1 rounded-lg border border-transparent bg-white/5 p-2 hover:border-white/30 hover:bg-white/10"
              >
                <AppGlyph
                  id={icon.id}
                  icon={icon.icon}
                  className="h-40 w-40 md:h-[120px] md:w-[120px]"
                  textClassName="text-8xl md:text-7xl"
                />
                <span className="w-full truncate text-center text-[11px]">
                  {icon.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StartMenu
