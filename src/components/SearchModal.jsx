import { useState } from 'react'
import { motion } from 'framer-motion'
import { iconImages } from '../assets/icons/index.js'
import { desktopIcons } from '../data/desktopIcons.js'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { accentColors } from '../data/accentColors.js'
import { filterApps } from '../utils/filterApps.js'
import AppGlyph from './icons/AppGlyph.jsx'
import CloseIcon from './icons/CloseIcon.jsx'

const DEFAULT_RECENT_IDS = [
  'this-pc',
  'resume',
  'store',
  'blog',
  'contact-info',
  'biography',
  'projects',
  'developer-lab',
  'games',
  'gmail',
]

const DEFAULT_TOP_APP_IDS = [
  'resume',
  'store',
  'projects',
  'games',
  'developer-lab',
  'this-pc',
]

const panelMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.96 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

function resolveApps(ids) {
  return ids
    .map((id) => desktopIcons.find((icon) => icon.id === id))
    .filter(Boolean)
}

function SearchModal({
  onClose,
  onOpenApp,
  onOpenNewWindow,
  onIconContextMenu,
  recentAppIds = [],
}) {
  const isMobile = useIsMobile()
  const { accentColor } = useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const recentApps = recentAppIds.length
    ? resolveApps(recentAppIds)
    : resolveApps(DEFAULT_RECENT_IDS)
  const topApps = resolveApps(DEFAULT_TOP_APP_IDS)
  const matches = filterApps(desktopIcons, query)
  const selectedApp = matches.find((app) => app.id === selectedId) ?? matches[0]

  function handleOpen(id) {
    onOpenApp(id)
    onClose()
  }

  function handleNewWindow(id) {
    onOpenNewWindow(id)
    onClose()
  }

  function handleOpenFileLocation() {
    onOpenApp('this-pc')
    onClose()
  }

  return (
    <motion.div
      {...panelMotion}
      style={{ transformOrigin: 'bottom left' }}
      className={
        isMobile
          ? 'absolute bottom-full inset-x-0 mb-0 flex h-[75vh] flex-col overflow-hidden border border-white/10 bg-[#1f1f1f]/95 text-white shadow-2xl backdrop-blur-md'
          : 'absolute bottom-full left-0 flex h-[560px] w-[760px] max-h-[70vh] flex-col overflow-hidden border border-white/10 bg-[#1f1f1f]/95 text-white shadow-2xl backdrop-blur-md'
      }
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className="border-b-2 pb-1"
            style={{
              borderColor: activeTab === 'all' ? accentHex : 'transparent',
              color: activeTab === 'all' ? '#ffffff' : 'rgba(255,255,255,0.6)',
            }}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apps')}
            className="border-b-2 pb-1"
            style={{
              borderColor: activeTab === 'apps' ? accentHex : 'transparent',
              color: activeTab === 'apps' ? '#ffffff' : 'rgba(255,255,255,0.6)',
            }}
          >
            Apps
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="flex h-7 w-7 items-center justify-center rounded hover:bg-white/10"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      {query.trim() === '' ? (
        <div className="flex min-h-0 flex-1">
          <div className="scrollbar-overlay w-[55%] shrink-0 overflow-y-auto px-3 py-3">
            <p className="mb-2 px-2 text-xs font-semibold text-white/50">
              Recent
            </p>
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
                className="flex w-full items-center gap-3 border-b border-white/10 px-2 py-1.5 text-left hover:bg-white/10"
              >
                <AppGlyph id={icon.id} icon={icon.icon} className="h-8 w-8" />
                <span className="text-sm">{icon.label}</span>
              </button>
            ))}
          </div>
          <div className="scrollbar-overlay w-[45%] shrink-0 overflow-y-auto border-l border-white/10 px-3 py-3">
            <p className="mb-2 text-xs font-semibold text-white/50">Top apps</p>
            <div className="grid grid-cols-3 gap-2">
              {topApps.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => handleOpen(icon.id)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onIconContextMenu?.(icon.id, e.clientX, e.clientY)
                  }}
                  className="flex flex-col items-center gap-1 rounded-lg border border-transparent bg-white/20 p-2 hover:border-white/30 hover:bg-white/25"
                >
                  <AppGlyph
                    id={icon.id}
                    icon={icon.icon}
                    className="h-8 w-8"
                    textClassName="text-2xl"
                  />
                  <span className="w-full truncate text-center text-[11px]">
                    {icon.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1">
          <div className="scrollbar-overlay min-w-0 flex-1 overflow-y-auto px-3 py-3">
            <p className="mb-2 px-2 text-xs font-semibold text-white/50">
              Best match
            </p>
            {matches.length === 0 ? (
              <p className="px-2 text-xs text-white/40">No results found.</p>
            ) : (
              matches.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => setSelectedId(icon.id)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onIconContextMenu?.(icon.id, e.clientX, e.clientY)
                  }}
                  className={`flex w-full items-center gap-3 rounded px-2 py-1.5 text-left hover:bg-white/10 ${
                    selectedApp?.id === icon.id ? 'bg-white/10' : ''
                  }`}
                >
                  <AppGlyph
                    id={icon.id}
                    icon={icon.icon}
                    className="h-8 w-8"
                    textClassName="text-2xl"
                  />
                  <span>
                    <span className="block text-sm">{icon.label}</span>
                    <span className="block text-xs text-white/40">App</span>
                  </span>
                </button>
              ))
            )}
          </div>
          {selectedApp && (
            <div className="w-[300px] shrink-0 overflow-y-auto border-l border-white/10 px-4 py-4">
              <div
                className="flex flex-col items-center gap-2 border-b border-white/10 pb-4"
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onIconContextMenu?.(selectedApp.id, e.clientX, e.clientY)
                }}
              >
                <AppGlyph
                  id={selectedApp.id}
                  icon={selectedApp.icon}
                  className="h-16 w-16"
                  textClassName="text-5xl"
                />
                <span className="text-base font-medium">
                  {selectedApp.label}
                </span>
                <span className="text-xs text-white/40">App</span>
              </div>
              <div className="mt-2 flex flex-col">
                <button
                  type="button"
                  onClick={() => handleOpen(selectedApp.id)}
                  className="flex items-center gap-3 rounded px-2 py-2 text-left text-sm hover:bg-white/10"
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    ⤢
                  </span>
                  Open
                </button>
                <button
                  type="button"
                  onClick={() => handleNewWindow(selectedApp.id)}
                  className="flex items-center gap-3 rounded px-2 py-2 text-left text-sm hover:bg-white/10"
                >
                  <AppGlyph
                    id={selectedApp.id}
                    icon={selectedApp.icon}
                    className="h-5 w-5"
                  />
                  New window
                </button>
                <button
                  type="button"
                  onClick={handleOpenFileLocation}
                  className="flex items-center gap-3 rounded px-2 py-2 text-left text-sm hover:bg-white/10"
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    📁
                  </span>
                  Open file location
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="shrink-0 border-t border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2">
          <img
            src={iconImages.search}
            alt=""
            className="h-4 w-4 object-contain"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here to search"
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
            style={{ caretColor: accentHex }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SearchModal
