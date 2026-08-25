import { forwardRef, useEffect, useRef } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { pixelToNearestCell } from '../utils/desktopGrid.js'
import AppGlyph from './icons/AppGlyph.jsx'

const SIZE_PRESETS = {
  small: {
    container: 'w-16',
    glyph: 'h-6 w-6',
    glyphText: 'text-lg',
    label: 'text-[10px]',
  },
  medium: {
    container: 'w-20',
    glyph: 'h-8 w-8',
    glyphText: 'text-2xl',
    label: 'text-xs',
  },
  large: {
    container: 'w-28',
    glyph: 'h-12 w-12',
    glyphText: 'text-4xl',
    label: 'text-sm',
  },
}

const DesktopIcon = forwardRef(function DesktopIcon(
  {
    id,
    icon,
    label,
    isSelected,
    onSelect,
    onOpen,
    onContextMenu,
    onDropAt,
    refreshToken,
    staggerIndex,
    variant = 'grid',
    size = 'medium',
    left,
    top,
  },
  ref,
) {
  const preset = SIZE_PRESETS[size] ?? SIZE_PRESETS.medium
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(1)
  const nodeRef = useRef(null)

  useEffect(() => {
    if (!refreshToken) return
    opacity.set(0)
    const controls = animate(opacity, 1, {
      duration: 0.35,
      delay: (staggerIndex ?? 0) * 0.04,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [refreshToken, opacity, staggerIndex])

  function setRefs(node) {
    nodeRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  function handleDragEnd() {
    if (onDropAt) {
      const cell = pixelToNearestCell(
        (left ?? 0) + x.get(),
        (top ?? 0) + y.get(),
      )
      onDropAt(id, cell.row, cell.col)
    }
    x.set(0)
    y.set(0)
  }

  if (variant === 'list') {
    return (
      <div
        ref={setRefs}
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
        className={`flex items-center gap-3 rounded p-2 text-white transition-colors ${
          isSelected ? 'bg-white/10' : 'hover:bg-white/5'
        }`}
      >
        <AppGlyph id={id} icon={icon} className="h-8 w-8 shrink-0" />
        <span className="flex-1 text-sm">{label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onContextMenu(e.clientX, e.clientY)
          }}
          aria-label={`${label} options`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-white/10"
        >
          ⋮
        </button>
      </div>
    )
  }

  return (
    <motion.div
      ref={setRefs}
      style={{ x, y, opacity, position: 'absolute', left, top }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onContextMenu(e.clientX, e.clientY)
      }}
      className={`flex ${preset.container} cursor-grab flex-col items-center gap-1 rounded border p-2 text-center text-white transition-colors active:cursor-grabbing ${
        isSelected
          ? 'border-cyan-400 bg-white/10'
          : 'border-transparent hover:bg-white/5'
      }`}
    >
      <AppGlyph
        id={id}
        icon={icon}
        className={preset.glyph}
        textClassName={preset.glyphText}
      />
      <span
        className={`${preset.label} leading-tight [text-shadow:0_0_3px_rgba(0,0,0,0.9),0_0_6px_rgba(0,0,0,0.7)]`}
      >
        {label}
      </span>
    </motion.div>
  )
})

export default DesktopIcon
