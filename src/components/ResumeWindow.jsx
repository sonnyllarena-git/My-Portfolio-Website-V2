import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { accentColors } from '../data/accentColors.js'
import ResumePage from './ResumePage.jsx'

const RESUME_FILE_PATH = '/resume.pdf'
const FADE_DURATION = 0.18

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
  const positionClasses = isMobile
    ? 'fixed inset-0'
    : isMaximized
      ? 'fixed inset-x-0 top-0 bottom-12'
      : 'absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2'

  useEffect(() => {
    const timer = setTimeout(
      () => setShouldRender(!isClosing),
      isClosing ? FADE_DURATION * 1000 : 0,
    )
    return () => clearTimeout(timer)
  }, [isClosing])

  if (!shouldRender) return null

  return (
    <motion.div
      onClick={() => setShowFileMenu(false)}
      onContextMenu={(e) => e.stopPropagation()}
      onMouseDownCapture={onFocus}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHidden ? 0 : 1 }}
      transition={{ duration: FADE_DURATION }}
      style={{ borderColor: accentHex, zIndex }}
      className={`${positionClasses} overflow-hidden border-2 bg-[#2b2b2b] shadow-2xl ${isHidden ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <div className="flex h-10 items-center justify-between bg-[#b30b00] pl-3 text-white">
        <span className="text-sm font-medium">Resume.pdf</span>
        <div className="flex h-full items-stretch">
          <button
            onClick={onMinimizeToggle}
            className="flex h-full w-9 items-center justify-center hover:bg-black/30"
            aria-label="Minimize"
          >
            _
          </button>
          <button
            onClick={() => setIsMaximized((prev) => !prev)}
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
      <ResumePage />
    </motion.div>
  )
}

export default ResumeWindow
