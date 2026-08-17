import { motion } from 'framer-motion'

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

function DesktopIcon({
  icon,
  label,
  isActive,
  onSelect,
  onOpen,
  onContextMenu,
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
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
      className={`flex w-20 cursor-grab flex-col items-center gap-1 rounded border p-2 text-center text-white active:cursor-grabbing ${
        isActive ? 'border-cyan-400 bg-white/10' : 'border-transparent'
      }`}
    >
      <span className="flex h-8 w-8 items-center justify-center text-2xl">
        {icon === 'pdf' ? <PdfGlyph /> : icon}
      </span>
      <span className="text-xs leading-tight">{label}</span>
    </motion.div>
  )
}

export default DesktopIcon
