import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Rnd } from 'react-rnd'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { accentColors } from '../data/accentColors.js'

const MIN_WIDTH = 480
const MIN_HEIGHT = 320
const TASKBAR_HEIGHT = 48
const FADE_DURATION = 0.18

function Window({
  icon,
  title,
  onClose,
  isMinimized = false,
  isClosing = false,
  onMinimizeToggle,
  defaultWidth = MIN_WIDTH,
  defaultHeight = MIN_HEIGHT,
  cascadeOffset = 0,
  zIndex,
  onFocus,
  hideTitleBar = false,
  square = false,
  titleBarClassName,
  children,
}) {
  const { accentColor } = useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const isMobile = useIsMobile()
  const isHidden = isMinimized || isClosing
  const [shouldRender, setShouldRender] = useState(!isClosing)
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousLayout, setPreviousLayout] = useState(null)

  useEffect(() => {
    const timer = setTimeout(
      () => setShouldRender(!isClosing),
      isClosing ? FADE_DURATION * 1000 : 0,
    )
    return () => clearTimeout(timer)
  }, [isClosing])
  const [layout, setLayout] = useState(() => {
    const width = Math.max(defaultWidth, MIN_WIDTH)
    const height = Math.max(defaultHeight, MIN_HEIGHT)
    return {
      width,
      height,
      x: Math.max(0, (window.innerWidth - width) / 2 + cascadeOffset),
      y: Math.max(
        0,
        (window.innerHeight - TASKBAR_HEIGHT - height) / 2 + cascadeOffset,
      ),
    }
  })

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
        onContextMenu={(e) => e.stopPropagation()}
        onMouseDownCapture={onFocus}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: FADE_DURATION }}
        style={square ? undefined : { borderColor: accentHex }}
        className={
          square
            ? 'flex h-full w-full flex-col overflow-hidden border border-black/60 bg-black text-white shadow-2xl'
            : 'flex h-full w-full flex-col overflow-hidden rounded-lg border-2 bg-[#1a1c22] text-white shadow-2xl'
        }
      >
        {!hideTitleBar && (
          <div
            className={`window-title-bar flex ${square ? 'h-9 pl-3' : 'h-10 px-3 py-2'} shrink-0 cursor-move items-center justify-between ${titleBarClassName ?? 'bg-[#25272e]'}`}
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              {icon}
              {title}
            </span>
            <div
              onMouseDown={(e) => e.stopPropagation()}
              className={
                square ? 'flex h-full items-stretch' : 'flex items-center gap-1'
              }
            >
              <button
                onClick={onMinimizeToggle}
                aria-label="Minimize"
                className={
                  square
                    ? 'flex h-full w-9 items-center justify-center hover:bg-black/10'
                    : 'flex h-5 w-6 items-center justify-center rounded hover:bg-white/10'
                }
              >
                −
              </button>
              <button
                onClick={toggleMaximize}
                aria-label={isMaximized ? 'Restore' : 'Maximize'}
                className={
                  square
                    ? 'flex h-full w-9 items-center justify-center hover:bg-black/10'
                    : 'flex h-5 w-6 items-center justify-center rounded hover:bg-white/10'
                }
              >
                {isMaximized ? '❐' : '□'}
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className={
                  square
                    ? 'flex h-full w-9 items-center justify-center hover:bg-red-600 hover:text-white'
                    : 'flex h-5 w-6 items-center justify-center rounded hover:bg-red-500/80'
                }
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          {typeof children === 'function'
            ? children({ toggleMaximize, isMaximized })
            : (children ?? (
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  Coming soon
                </div>
              ))}
        </div>
      </motion.div>
    </Rnd>
  )
}

export default Window
