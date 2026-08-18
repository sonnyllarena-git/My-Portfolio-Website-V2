function Tile({
  isSelected,
  onSelect,
  onOpen,
  onContextMenu,
  className,
  children,
}) {
  return (
    <div
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
        onSelect()
        onContextMenu(e.clientX, e.clientY)
      }}
      className={`${className} ${isSelected ? 'bg-white/15' : 'hover:bg-white/10'}`}
    >
      {children}
    </div>
  )
}

export default Tile
