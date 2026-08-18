import { useState } from 'react'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { accentColors } from '../data/accentColors.js'

const RESUME_FILE_PATH = '/resume.pdf'

function downloadResume() {
  const link = document.createElement('a')
  link.href = RESUME_FILE_PATH
  link.download = 'Sonny-Llarena-Resume.pdf'
  link.click()
}

function ResumeWindow({
  onClose,
  isMinimized = false,
  onMinimizeToggle,
  zIndex,
  onFocus,
}) {
  const { accentColor } = useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const [showFileMenu, setShowFileMenu] = useState(false)

  if (isMinimized) return null

  return (
    <div
      onClick={() => setShowFileMenu(false)}
      onContextMenu={(e) => e.stopPropagation()}
      onMouseDownCapture={onFocus}
      style={{ borderColor: accentHex, zIndex }}
      className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-2 bg-[#2b2b2b] shadow-2xl"
    >
      <div className="flex items-center justify-between bg-[#b30b00] px-3 py-2 text-white">
        <span className="text-sm font-medium">Resume.pdf</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimizeToggle}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-black/30"
            aria-label="Minimize"
          >
            _
          </button>
          <button
            onClick={onClose}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-black/30"
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
      <div className="flex justify-center bg-[#525659] p-6">
        <div className="h-80 w-64 space-y-3 rounded-sm bg-white p-4 shadow-lg">
          <div className="h-4 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
          <div className="mt-4 h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default ResumeWindow
