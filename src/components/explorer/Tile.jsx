function Tile({
  isSelected,
  onSelect,
  onOpen,
  onContextMenu,
  className,
  isMobile = false,
  children,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        if (isMobile) onOpen()
        else onSelect()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect()
        onContextMenu(e.clientX, e.clientY)
      }}
      className={`${className} ${isSelected ? 'bg-white/15' : 'hover:bg-white/10'}`}
    >
      {children}
      {isMobile && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
            onContextMenu(e.clientX, e.clientY)
          }}
          aria-label="Options"
          className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded hover:bg-white/10"
        >
          ⋮
        </button>
      )}
    </div>
  )
}

export default Tile
