import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SystemTray from './SystemTray.jsx'
import TaskbarPreview from './TaskbarPreview.jsx'
import StartMenu from './StartMenu.jsx'
import SearchModal from './SearchModal.jsx'
import { iconImages } from '../assets/icons/index.js'
import { useIsMobile } from '../hooks/useIsMobile.js'

function IconGlyph({ id, icon }) {
  if (typeof icon !== 'string' && icon !== undefined) return icon
  return iconImages[id] ? (
    <img src={iconImages[id]} alt="" className="h-6 w-6 object-contain" />
  ) : (
    icon
  )
}

function TaskbarButton({ id, icon, label, onClick, isActive = false }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex h-[43px] w-[43px] items-center justify-center rounded text-xl text-white ${
        isActive ? 'bg-white/20' : 'hover:bg-white/10'
      }`}
    >
      <IconGlyph id={id} icon={icon} />
    </button>
  )
}

function RunningAppButton({
  id,
  icon,
  label,
  isMinimized,
  onClick,
  preview,
  naturalWidth,
  naturalHeight,
}) {
  const isMobile = useIsMobile()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        aria-label={label}
        className={`flex h-[43px] w-[43px] items-center justify-center rounded text-xl text-white ${
          isMinimized
            ? 'bg-white/5 hover:bg-white/10'
            : 'bg-white/20 hover:bg-white/30'
        }`}
      >
        <IconGlyph id={id} icon={icon} />
      </button>
      <AnimatePresence>
        {isHovered && !isMobile && (
          <TaskbarPreview
            label={label}
            content={preview}
            naturalWidth={naturalWidth}
            naturalHeight={naturalHeight}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const pinnedTaskbarApps = [
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'developer-lab', label: 'Developer Lab', icon: '🛠️' },
  { id: 'music-lab', label: 'Music Lab', icon: '🎵' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'terminal', label: 'Command Prompt', icon: '>_' },
  { id: 'store', label: 'Store', icon: '🛒' },
  { id: 'blog', label: 'Blog', icon: '📝' },
]

function Taskbar({
  openWindows = [],
  onWindowClick,
  onOpenSettings,
  onOpenApp,
  onOpenNewWindow,
  onIconContextMenu,
  recentAppIds = [],
  onPowerAction,
}) {
  const isMobile = useIsMobile()
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const startAreaRef = useRef(null)
  const searchAreaRef = useRef(null)

  useEffect(() => {
    if (!isStartMenuOpen) return
    function handleOutsideMouseDown(e) {
      if (!startAreaRef.current?.contains(e.target)) setIsStartMenuOpen(false)
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [isStartMenuOpen])

  useEffect(() => {
    if (!isSearchOpen) return
    function handleOutsideMouseDown(e) {
      if (!searchAreaRef.current?.contains(e.target)) setIsSearchOpen(false)
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [isSearchOpen])

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex h-12 items-center gap-2 border-t border-white/10 bg-black/40 px-2 backdrop-blur-md">
      <div ref={startAreaRef}>
        <TaskbarButton
          id="start"
          icon="⊞"
          label="Start"
          isActive={isStartMenuOpen}
          onClick={() => setIsStartMenuOpen((prev) => !prev)}
        />
        <AnimatePresence>
          {isStartMenuOpen && (
            <StartMenu
              onClose={() => setIsStartMenuOpen(false)}
              onOpenApp={onOpenApp}
              onIconContextMenu={onIconContextMenu}
              recentAppIds={recentAppIds}
              onPowerAction={onPowerAction}
            />
          )}
        </AnimatePresence>
      </div>
      {!isMobile &&
        pinnedTaskbarApps.map((item) =>
          item.id === 'search' ? (
            <div key={item.id} ref={searchAreaRef} className="relative">
              <TaskbarButton
                id={item.id}
                icon={item.icon}
                label={item.label}
                isActive={isSearchOpen}
                onClick={() => setIsSearchOpen((prev) => !prev)}
              />
              <AnimatePresence>
                {isSearchOpen && (
                  <SearchModal
                    onClose={() => setIsSearchOpen(false)}
                    onOpenApp={onOpenApp}
                    onOpenNewWindow={onOpenNewWindow}
                    onIconContextMenu={onIconContextMenu}
                    recentAppIds={recentAppIds}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <TaskbarButton
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              onClick={
                item.id === 'settings'
                  ? onOpenSettings
                  : () => onOpenApp(item.id)
              }
            />
          ),
        )}
      {isMobile && (
        <TaskbarButton
          id="settings"
          icon="⚙️"
          label="Settings"
          onClick={onOpenSettings}
        />
      )}
      {openWindows.length > 0 && (
        <div className="ml-4 flex items-center gap-2 border-l border-white/10 pl-4">
          {openWindows.map((w) => (
            <RunningAppButton
              key={w.instanceId}
              id={w.id}
              icon={w.icon}
              label={w.label}
              isMinimized={w.isMinimized}
              onClick={() => onWindowClick(w.instanceId)}
              preview={w.preview}
              naturalWidth={w.naturalWidth}
              naturalHeight={w.naturalHeight}
            />
          ))}
        </div>
      )}
      <SystemTray />
    </div>
  )
}

export default Taskbar
