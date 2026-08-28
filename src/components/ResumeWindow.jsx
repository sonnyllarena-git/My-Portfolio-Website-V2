import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Rnd } from 'react-rnd'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { accentColors } from '../data/accentColors.js'
import ResumePage from './ResumePage.jsx'

const RESUME_FILE_PATH = '/resume.pdf'
const FADE_DURATION = 0.18
const MIN_WIDTH = 360
const MIN_HEIGHT = 420
const DEFAULT_WIDTH = 420
const DEFAULT_HEIGHT = 600
const TASKBAR_HEIGHT = 48

function downloadResume() {
  const link = document.createElement('a')
  link.href = RESUME_FILE_PATH
  link.download = 'Sonny-Llarena-Resume.pdf'
  link.click()
}

function ResumeWindow({
  onClose,
  isMinimized = false,
  isClosing = false,
  onMinimizeToggle,
  zIndex,
  onFocus,
}) {
  const { accentColor } = useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const isMobile = useIsMobile()
  const isHidden = isMinimized || isClosing
  const [shouldRender, setShouldRender] = useState(!isClosing)
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousLayout, setPreviousLayout] = useState(null)
  const [layout, setLayout] = useState(() => ({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    x: Math.max(0, (window.innerWidth - DEFAULT_WIDTH) / 2),
    y: Math.max(0, (window.innerHeight - TASKBAR_HEIGHT - DEFAULT_HEIGHT) / 2),
  }))

  useEffect(() => {
    const timer = setTimeout(
      () => setShouldRender(!isClosing),
      isClosing ? FADE_DURATION * 1000 : 0,
    )
    return () => clearTimeout(timer)
  }, [isClosing])

  useEffect(() => {
    if (!isMobile) return
    const fillViewport = () =>
      setLayout({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      })
    fillViewport()
    window.addEventListener('resize', fillViewport)
    return () => window.removeEventListener('resize', fillViewport)
  }, [isMobile])

  function toggleMaximize() {
    if (isMaximized) {
      setLayout(previousLayout ?? layout)
      setIsMaximized(false)
    } else {
      setPreviousLayout(layout)
      setLayout({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      })
      setIsMaximized(true)
    }
  }

  if (!shouldRender) return null

  return (
    <Rnd
      size={{ width: layout.width, height: layout.height }}
      position={{ x: layout.x, y: layout.y }}
      onDragStop={(e, d) => setLayout((prev) => ({ ...prev, x: d.x, y: d.y }))}
      onResizeStop={(e, dir, ref, delta, pos) =>
        setLayout({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          ...pos,
        })
      }
      minWidth={isMobile ? 0 : MIN_WIDTH}
      minHeight={isMobile ? 0 : MIN_HEIGHT}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      disableDragging={isMaximized || isMobile}
      enableResizing={!isMaximized && !isMobile}
      className={isHidden ? 'pointer-events-none' : 'pointer-events-auto'}
      style={{ zIndex }}
    >
      <motion.div
        onClick={() => setShowFileMenu(false)}
        onContextMenu={(e) => e.stopPropagation()}
        onMouseDownCapture={onFocus}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: FADE_DURATION }}
        style={{ borderColor: accentHex }}
        className="flex h-full w-full flex-col overflow-hidden border-2 bg-[#2b2b2b] shadow-2xl"
      >
        <div className="window-title-bar flex h-10 shrink-0 cursor-move items-center justify-between bg-[#202124] pl-3 text-white">
          <span className="text-sm font-medium">Resume.pdf</span>
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex h-full items-stretch"
          >
            <button
              onClick={onMinimizeToggle}
              className="flex h-full w-9 items-center justify-center hover:bg-black/30"
              aria-label="Minimize"
            >
              _
            </button>
            <button
              onClick={toggleMaximize}
              className="flex h-full w-9 items-center justify-center hover:bg-black/30"
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? '❐' : '□'}
            </button>
            <button
              onClick={onClose}
              className="flex h-full w-9 items-center justify-center hover:bg-black/30"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="relative flex items-center justify-between bg-[#3c3c3c] px-3 py-1 text-xs text-white/70">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowFileMenu((prev) => !prev)
            }}
            className="rounded px-1 hover:bg-white/10 hover:text-white"
          >
            File ▾
          </button>
          <span>Page 1 of 1</span>
          <span>100%</span>
          {showFileMenu && (
            <div className="absolute top-full left-2 z-40 w-40 rounded-b-md border border-white/10 bg-[#1f2126] py-1 text-white shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadResume()
                  setShowFileMenu(false)
                }}
                className="block w-full px-3 py-1.5 text-left hover:bg-white/10"
              >
                Save As
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  downloadResume()
                  setShowFileMenu(false)
                }}
                className="block w-full px-3 py-1.5 text-left hover:bg-white/10"
              >
                Download
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.print()
                  setShowFileMenu(false)
                }}
                className="block w-full px-3 py-1.5 text-left hover:bg-white/10"
              >
                Print
              </button>
            </div>
          )}
        </div>
        <div className="min-h-0 flex-1">
          <ResumePage />
        </div>
      </motion.div>
    </Rnd>
  )
}

export default ResumeWindow
