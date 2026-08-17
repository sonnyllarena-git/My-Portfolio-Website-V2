import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'

const MIN_WIDTH = 480
const MIN_HEIGHT = 320
const TASKBAR_HEIGHT = 48
const TITLE_BAR_HEIGHT = 40

function Window({
  icon,
  title,
  onClose,
  defaultWidth = MIN_WIDTH,
  defaultHeight = MIN_HEIGHT,
  children,
}) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const previousLayout = useRef(null)
  const [layout, setLayout] = useState(() => {
    const width = Math.max(defaultWidth, MIN_WIDTH)
    const height = Math.max(defaultHeight, MIN_HEIGHT)
    return {
      width,
      height,
      x: Math.max(0, (window.innerWidth - width) / 2),
      y: Math.max(0, (window.innerHeight - TASKBAR_HEIGHT - height) / 2),
    }
  })

  function toggleMaximize() {
    if (isMaximized) {
      setLayout(previousLayout.current ?? layout)
      setIsMaximized(false)
    } else {
      previousLayout.current = layout
      setLayout({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      })
      setIsMaximized(true)
    }
  }

  return (
    <Rnd
      size={{
        width: layout.width,
        height: isMinimized ? TITLE_BAR_HEIGHT : layout.height,
      }}
      position={{ x: layout.x, y: layout.y }}
      onDragStop={(e, d) => setLayout((prev) => ({ ...prev, x: d.x, y: d.y }))}
      onResizeStop={(e, dir, ref, delta, pos) =>
        setLayout({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          ...pos,
        })
      }
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      disableDragging={isMaximized}
      enableResizing={!isMaximized && !isMinimized}
      className="z-20"
    >
      <div
        onContextMenu={(e) => e.stopPropagation()}
        className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1a1c22] text-white shadow-2xl"
      >
        <div className="window-title-bar flex h-10 shrink-0 cursor-move items-center justify-between bg-[#25272e] px-3 py-2">
          <span className="flex items-center gap-2 text-sm font-medium">
            {icon}
            {title}
          </span>
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex items-center gap-1"
          >
            <button
              onClick={() => setIsMinimized((prev) => !prev)}
              aria-label="Minimize"
              className="flex h-5 w-6 items-center justify-center rounded hover:bg-white/10"
            >
              −
            </button>
            <button
              onClick={toggleMaximize}
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
          <div className="flex-1 overflow-auto">
            {children ?? (
              <div className="flex h-full items-center justify-center text-sm text-white/40">
                Coming soon
              </div>
            )}
          </div>
        )}
      </div>
    </Rnd>
  )
}

export default Window
