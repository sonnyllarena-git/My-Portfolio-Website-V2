import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function useClampedPosition(innerRef, x, y) {
  const [position, setPosition] = useState({ top: y, left: x })

  useEffect(() => {
    const menu = innerRef.current
    if (!menu) return
    const { offsetWidth, offsetHeight } = menu
    const maxLeft = window.innerWidth - offsetWidth - 8
    const maxTop = window.innerHeight - offsetHeight - 8
    setPosition({
      left: Math.max(8, Math.min(x, maxLeft)),
      top: Math.max(8, Math.min(y, maxTop)),
    })
  }, [innerRef, x, y])

  return position
}

function MenuPanel({ innerRef, x, y, width, items, onItemClick }) {
  const position = useClampedPosition(innerRef, x, y)

  return (
    <div
      ref={innerRef}
      style={{ top: position.top, left: position.left, width }}
      className="fixed z-50 border border-black/10 bg-[#fbfbfd] py-2 text-[15px] text-black shadow-md"
    >
      {items.map((item, index) =>
        item.divider ? (
          <div
            key={`divider-${index}`}
            className="my-1 border-t border-black/10"
          />
        ) : (
          <button
            key={item.label}
            onClick={(e) => {
              e.stopPropagation()
              onItemClick(item, e)
            }}
            className={`flex w-full items-center justify-between px-5 text-left hover:bg-black/5 ${
              item.roomy ? 'py-2.5' : 'py-1.5'
            }`}
          >
            <span className="flex items-center gap-2">
              {item.selected && <span className="text-xs">●</span>}
              {item.label}
            </span>
            {item.hasSubmenu && <span className="text-black/40">›</span>}
          </button>
        ),
      )}
    </div>
  )
}

function ContextMenu({ x, y, items, onClose }) {
  const menuRef = useRef(null)
  const submenuRef = useRef(null)
  const [submenu, setSubmenu] = useState(null)

  useEffect(() => {
    function handleOutsidePointerDown(e) {
      if (menuRef.current?.contains(e.target)) return
      if (submenuRef.current?.contains(e.target)) return
      onClose()
    }
    window.addEventListener('mousedown', handleOutsidePointerDown)
    window.addEventListener('touchstart', handleOutsidePointerDown)
    return () => {
      window.removeEventListener('mousedown', handleOutsidePointerDown)
      window.removeEventListener('touchstart', handleOutsidePointerDown)
    }
  }, [onClose])

  function handleItemClick(item, e) {
    if (item.hasSubmenu) {
      const rect = e.currentTarget.getBoundingClientRect()
      setSubmenu((current) =>
        current?.label === item.label
          ? null
          : {
              label: item.label,
              x: rect.right,
              y: rect.top,
              items: item.submenuItems,
            },
      )
      return
    }
    item.onClick?.()
    onClose()
  }

  return createPortal(
    <>
      <MenuPanel
        innerRef={menuRef}
        x={x}
        y={y}
        width={230}
        items={items}
        onItemClick={handleItemClick}
      />
      {submenu && (
        <MenuPanel
          innerRef={submenuRef}
          x={submenu.x}
          y={submenu.y}
          width={190}
          items={submenu.items}
          onItemClick={(item) => {
            item.onClick?.()
            onClose()
          }}
        />
      )}
    </>,
    document.body,
  )
}

export default ContextMenu
