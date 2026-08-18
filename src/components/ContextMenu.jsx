import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function ContextMenu({ x, y, items, onClose }) {
  const menuRef = useRef(null)
  const [position, setPosition] = useState({ top: y, left: x })

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const { offsetWidth, offsetHeight } = menu
    const maxLeft = window.innerWidth - offsetWidth - 8
    const maxTop = window.innerHeight - offsetHeight - 8
    setPosition({
      left: Math.max(8, Math.min(x, maxLeft)),
      top: Math.max(8, Math.min(y, maxTop)),
    })
  }, [x, y])

  useEffect(() => {
    function handleOutsideMouseDown(e) {
      if (!menuRef.current?.contains(e.target)) onClose()
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [onClose])

  return createPortal(
    <div
      ref={menuRef}
      style={{ top: position.top, left: position.left }}
      className="fixed z-50 w-48 rounded-md border border-white/10 bg-[#1f2126] py-1 text-sm text-white shadow-xl"
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={(e) => {
            e.stopPropagation()
            item.onClick?.()
            onClose()
          }}
          className="block w-full px-3 py-1.5 text-left hover:bg-white/10"
        >
          {item.label}
        </button>
      ))}
    </div>,
    document.body,
  )
}

export default ContextMenu
