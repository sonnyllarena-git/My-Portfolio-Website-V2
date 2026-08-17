function ContextMenu({ x, y, items, onClose }) {
  return (
    <div
      style={{ top: y, left: x }}
      className="absolute z-50 w-48 rounded-md border border-white/10 bg-[#1f2126] py-1 text-sm text-white shadow-xl"
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
    </div>
  )
}

export default ContextMenu
