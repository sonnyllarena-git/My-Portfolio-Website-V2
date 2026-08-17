import { useState } from 'react'

function Window({ icon, title, onClose, width = 'w-96', children }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div
      className={`absolute flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1a1c22] text-white shadow-2xl ${
        isMaximized
          ? 'inset-2'
          : `top-1/2 left-1/2 ${width} -translate-x-1/2 -translate-y-1/2`
      }`}
    >
      <div className="flex shrink-0 items-center justify-between bg-[#25272e] px-3 py-2">
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized((prev) => !prev)}
            aria-label="Minimize"
            className="flex h-5 w-6 items-center justify-center rounded hover:bg-white/10"
          >
            −
          </button>
          <button
            onClick={() => setIsMaximized((prev) => !prev)}
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            className="flex h-5 w-6 items-center justify-center rounded hover:bg-white/10"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-5 w-6 items-center justify-center rounded hover:bg-red-500/80"
          >
            ×
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div
          className={
            isMaximized ? 'flex-1 overflow-auto' : 'max-h-[70vh] overflow-auto'
          }
        >
          {children ?? (
            <div className="flex h-48 items-center justify-center text-sm text-white/40">
              Coming soon
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Window
