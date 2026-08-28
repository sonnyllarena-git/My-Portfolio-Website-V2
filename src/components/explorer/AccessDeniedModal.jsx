import { useEffect, useRef } from 'react'
import errorSound from '../../assets/sounds/access-denied-error.mp3'

function AccessDeniedModal({ onClose }) {
  const soundRef = useRef(null)

  useEffect(() => {
    soundRef.current = new Audio(errorSound)
    soundRef.current.play().catch(() => {})
  }, [])

  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-[#5599e0] bg-white text-black shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-3 py-1.5">
          <span className="text-sm">Access Denied</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-6 w-8 items-center justify-center text-sm hover:bg-red-500 hover:text-white"
          >
            ×
          </button>
        </div>
        <div className="flex items-start gap-4 px-5 py-6">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e81123] text-lg font-bold text-white">
            ×
          </span>
          <p className="text-sm leading-snug">
            Only Sonny has permission to open this file.
          </p>
        </div>
        <div className="flex justify-end border-t border-gray-200 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[80px] bg-[#0078d7] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#106ebe]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccessDeniedModal
