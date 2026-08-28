import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MusicWave from './MusicWave.jsx'
import ContextMenu from '../ContextMenu.jsx'
import PlayIcon from '../icons/PlayIcon.jsx'
import PauseIcon from '../icons/PauseIcon.jsx'

const SIZE = 200
const TASKBAR_HEIGHT = 48
const MARGIN = 16
const ICON_COLOR = '#7fe0d7'

const WAVE_COLORS = [
  { key: 'rainbow', label: 'Rainbow' },
  { key: 'teal', label: 'Teal' },
  { key: 'red', label: 'Red' },
  { key: 'blue', label: 'Blue' },
  { key: 'pink', label: 'Pink' },
  { key: 'white', label: 'White' },
  { key: 'orange', label: 'Orange' },
  { key: 'purple', label: 'Purple' },
]

function PlusGlyph() {
  return (
    <span className="relative block h-3.5 w-3.5">
      <span
        className="absolute top-1/2 left-0 h-[2.5px] w-full -translate-y-1/2 rounded-full"
        style={{ backgroundColor: ICON_COLOR }}
      />
      <span
        className="absolute top-0 left-1/2 h-full w-[2.5px] -translate-x-1/2 rounded-full"
        style={{ backgroundColor: ICON_COLOR }}
      />
    </span>
  )
}

function DashGlyph() {
  return (
    <span
      className="block h-[2.5px] w-4 rounded-full"
      style={{ backgroundColor: ICON_COLOR }}
    />
  )
}

function BarGlyph() {
  return (
    <span
      className="block h-4 w-[2.5px] rounded-full"
      style={{ backgroundColor: ICON_COLOR }}
    />
  )
}

function ControlTooltip({ text }) {
  return (
    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 rounded bg-black/85 px-2 py-1 text-[10px] whitespace-nowrap text-white shadow">
      {text}
    </span>
  )
}

function MusicLabFloatingPlayer({
  activeItem,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  volume,
  onVolumeChange,
  onRestore,
}) {
  const wrapRef = useRef(null)
  const volumeHideTimeoutRef = useRef(null)
  const [isWaveVisible, setIsWaveVisible] = useState(false)
  const [isWaveHovered, setIsWaveHovered] = useState(false)
  const [waveColor, setWaveColor] = useState('rainbow')
  const [colorMenu, setColorMenu] = useState(null)
  const [hoveredControl, setHoveredControl] = useState(null)
  const [isVolumeIndicatorVisible, setIsVolumeIndicatorVisible] =
    useState(false)
  const [pos, setPos] = useState(() => ({
    x: window.innerWidth - SIZE - MARGIN,
    y: window.innerHeight - TASKBAR_HEIGHT - MARGIN - SIZE,
  }))

  useEffect(() => {
    return () => clearTimeout(volumeHideTimeoutRef.current)
  }, [])

  function showVolumeIndicator() {
    setIsVolumeIndicatorVisible(true)
    clearTimeout(volumeHideTimeoutRef.current)
    volumeHideTimeoutRef.current = setTimeout(() => {
      setIsVolumeIndicatorVisible(false)
    }, 2000)
  }

  function handleDragStart(e) {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const origin = pos
    function handleMouseMove(moveEvent) {
      const width = wrapRef.current?.offsetWidth ?? SIZE
      const height = wrapRef.current?.offsetHeight ?? SIZE
      const nextX = origin.x + (moveEvent.clientX - startX)
      const nextY = origin.y + (moveEvent.clientY - startY)
      setPos({
        x: Math.min(Math.max(nextX, 0), window.innerWidth - width),
        y: Math.min(
          Math.max(nextY, 0),
          window.innerHeight - TASKBAR_HEIGHT - height,
        ),
      })
    }
    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function stopDrag(e) {
    e.stopPropagation()
  }

  function hoverProps(key) {
    return {
      onMouseEnter: () => setHoveredControl(key),
      onMouseLeave: () =>
        setHoveredControl((prev) => (prev === key ? null : prev)),
    }
  }

  return createPortal(
    <>
      <div
        ref={wrapRef}
        style={{ left: pos.x, top: pos.y, width: SIZE }}
        className="fixed z-50"
      >
        {isWaveVisible && activeItem && (
          <div
            className="absolute bottom-full left-0 mb-2 w-full px-2 py-2"
            onMouseEnter={() => setIsWaveHovered(true)}
            onMouseLeave={() => setIsWaveHovered(false)}
          >
            <div className="relative">
              <MusicWave
                isPlaying={isPlaying}
                volume={volume}
                colorMode={waveColor}
              />
              {isPlaying && (
                <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
                  <motion.div
                    className="flex w-max items-center gap-16 text-xs font-medium whitespace-nowrap text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <span>Now Playing: {activeItem.title}</span>
                    <span>Now Playing: {activeItem.title}</span>
                  </motion.div>
                </div>
              )}
              {isWaveHovered && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const rect = e.currentTarget.getBoundingClientRect()
                    setColorMenu({ x: rect.left, y: rect.bottom + 4 })
                  }}
                  onMouseDown={stopDrag}
                  aria-label="Choose equalizer color"
                  className="absolute top-1 right-1 h-5 w-5 cursor-pointer rounded-full shadow transition ring-1 ring-white/40 hover:scale-110"
                  style={{
                    background:
                      'conic-gradient(red, orange, yellow, limegreen, cyan, blue, violet, red)',
                  }}
                />
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {isVolumeIndicatorVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 -left-5 h-[140px] w-2 -translate-y-1/2 overflow-hidden rounded-full bg-black/25 shadow-inner"
            >
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-[#4fada7] to-[#8ee5db]"
                animate={{ height: `${Math.max(0, Math.min(100, volume))}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          onMouseDown={handleDragStart}
          style={{ width: SIZE, height: SIZE }}
          className="relative cursor-move rounded-[28px] bg-gradient-to-b from-[#7fe0d7] to-[#4fada7] shadow-2xl"
        >
          <div className="absolute top-4 left-5">
            <button
              onClick={onRestore}
              onMouseDown={stopDrag}
              {...hoverProps('restore')}
              aria-label="Restore Music Lab"
              className="h-3.5 w-9 cursor-pointer rounded-full bg-[#8ee5db] shadow-inner transition hover:brightness-110"
            />
            {hoveredControl === 'restore' && (
              <ControlTooltip text="Restore Music Lab" />
            )}
          </div>

          <div className="absolute top-3 right-4">
            <button
              onClick={() => setIsWaveVisible((prev) => !prev)}
              onMouseDown={stopDrag}
              {...hoverProps('equalizer')}
              aria-label={isWaveVisible ? 'Hide music wave' : 'Show music wave'}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-inner transition hover:brightness-110 ${
                isWaveVisible ? 'bg-[#3f4e5c]' : 'bg-[#78828f]'
              }`}
            >
              <span className="flex flex-col gap-[3px]">
                <span
                  className="h-[2px] w-4 rounded-full"
                  style={{ backgroundColor: ICON_COLOR }}
                />
                <span
                  className="h-[2px] w-4 rounded-full"
                  style={{ backgroundColor: ICON_COLOR }}
                />
                <span
                  className="h-[2px] w-4 rounded-full"
                  style={{ backgroundColor: ICON_COLOR }}
                />
              </span>
            </button>
            {hoveredControl === 'equalizer' && (
              <ControlTooltip text="Turn on/off equalizer" />
            )}
          </div>

          <div
            onMouseDown={stopDrag}
            className="absolute top-1/2 left-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full bg-[#47576a] shadow-inner"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
              <button
                onClick={() => {
                  onVolumeChange(Math.min(100, volume + 10))
                  showVolumeIndicator()
                }}
                onMouseDown={stopDrag}
                {...hoverProps('volume-up')}
                aria-label="Volume up"
                className="cursor-pointer transition hover:scale-110 hover:brightness-125"
              >
                <PlusGlyph />
              </button>
              {hoveredControl === 'volume-up' && (
                <ControlTooltip text="Volume up" />
              )}
            </div>

            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <button
                onClick={onPrev}
                onMouseDown={stopDrag}
                {...hoverProps('previous')}
                aria-label="Previous"
                className="cursor-pointer transition hover:scale-110 hover:brightness-125"
              >
                <DashGlyph />
              </button>
              {hoveredControl === 'previous' && (
                <ControlTooltip text="Previous" />
              )}
            </div>

            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <button
                onClick={onNext}
                onMouseDown={stopDrag}
                {...hoverProps('next')}
                aria-label="Next"
                className="cursor-pointer transition hover:scale-110 hover:brightness-125"
              >
                <DashGlyph />
              </button>
              {hoveredControl === 'next' && <ControlTooltip text="Next" />}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <button
                onClick={() => {
                  onVolumeChange(Math.max(0, volume - 10))
                  showVolumeIndicator()
                }}
                onMouseDown={stopDrag}
                {...hoverProps('volume-down')}
                aria-label="Volume down"
                className="cursor-pointer transition hover:scale-110 hover:brightness-125"
              >
                <BarGlyph />
              </button>
              {hoveredControl === 'volume-down' && (
                <ControlTooltip text="Volume down" />
              )}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={onTogglePlay}
                onMouseDown={stopDrag}
                {...hoverProps('play-pause')}
                disabled={!activeItem}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-[#5c6d7d] transition hover:border-[#7fe0d7] hover:bg-[#3f4e5c] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ color: ICON_COLOR }}
              >
                {isPlaying ? (
                  <PauseIcon className="h-6 w-6" />
                ) : (
                  <PlayIcon className="ml-0.5 h-6 w-6" />
                )}
              </button>
              {hoveredControl === 'play-pause' && (
                <ControlTooltip text={isPlaying ? 'Pause' : 'Play'} />
              )}
            </div>
          </div>
        </div>
      </div>
      {colorMenu && (
        <ContextMenu
          x={colorMenu.x}
          y={colorMenu.y}
          onClose={() => setColorMenu(null)}
          items={WAVE_COLORS.map((c) => ({
            label: c.label,
            selected: waveColor === c.key,
            onClick: () => setWaveColor(c.key),
          }))}
        />
      )}
    </>,
    document.body,
  )
}

export default MusicLabFloatingPlayer
