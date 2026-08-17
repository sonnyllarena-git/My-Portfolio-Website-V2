import { forwardRef, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { iconImages } from '../assets/icons/index.js'
import { rectsIntersect } from '../utils/geometry.js'

function PdfGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path
        d="M4 2h10l6 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
        fill="#ffffff"
      />
      <path d="M14 2v6h6" fill="#cbd5e1" />
      <rect x="2" y="15" width="16" height="6" rx="1" fill="#e11d48" />
      <text
        x="10"
        y="19.5"
        textAnchor="middle"
        fontSize="5"
        fontWeight="700"
        fill="#ffffff"
      >
        PDF
      </text>
    </svg>
  )
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
    getOtherRects,
  },
  ref,
) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const nodeRef = useRef(null)
  const lastGoodPositionRef = useRef({ x: 0, y: 0 })

  function setRefs(node) {
    nodeRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  function handleDragStart() {
    lastGoodPositionRef.current = { x: x.get(), y: y.get() }
  }

  function handleDrag() {
    const node = nodeRef.current
    if (!node || !getOtherRects) return
    const rect = node.getBoundingClientRect()
    const overlaps = getOtherRects(id).some((other) =>
      rectsIntersect(rect, other),
    )
    if (overlaps) {
      x.set(lastGoodPositionRef.current.x)
      y.set(lastGoodPositionRef.current.y)
    } else {
      lastGoodPositionRef.current = { x: x.get(), y: y.get() }
    }
  }

  return (
    <motion.div
      ref={setRefs}
      style={{ x, y }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
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
      className={`flex w-20 cursor-grab flex-col items-center gap-1 rounded border p-2 text-center text-white transition-colors active:cursor-grabbing ${
        isSelected
          ? 'border-cyan-400 bg-white/10'
          : 'border-transparent hover:bg-white/5'
      }`}
    >
      <span className="flex h-8 w-8 items-center justify-center text-2xl">
        {iconImages[id] ? (
          <img src={iconImages[id]} alt="" className="h-8 w-8 object-contain" />
        ) : icon === 'pdf' ? (
          <PdfGlyph />
        ) : (
          icon
        )}
      </span>
      <span className="text-xs leading-tight [text-shadow:0_0_3px_rgba(0,0,0,0.9),0_0_6px_rgba(0,0,0,0.7)]">
        {label}
      </span>
    </motion.div>
  )
})

export default DesktopIcon
