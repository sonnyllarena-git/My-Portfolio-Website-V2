import ItemIcon from './ItemIcon.jsx'
import Tile from './Tile.jsx'

function ChevronIcon({ expanded }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 text-white/70 transition-transform ${expanded ? 'rotate-90' : ''}`}
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function SidebarNode({
  item,
  path,
  depth,
  selectedTile,
  onSelect,
  onOpen,
  onContextMenu,
  isMobile,
  expandedPaths,
  onToggleExpand,
}) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const isExpanded = expandedPaths.has(path)

  return (
    <>
      <Tile
        isSelected={selectedTile === path}
        onSelect={() => onSelect(path)}
        onOpen={() => onOpen(item)}
        onContextMenu={(x, y) => onContextMenu(x, y, item)}
        isMobile={isMobile}
        className={
          isMobile
            ? 'flex shrink-0 cursor-pointer items-center gap-1.5 rounded px-2 py-1.5 whitespace-nowrap'
            : 'flex cursor-pointer items-center gap-1.5 py-1.5 pr-3 pl-3'
        }
      >
        {!isMobile && (
          <span style={{ width: depth * 14 }} className="shrink-0" />
        )}
        {hasChildren ? (
          <button
            type="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand(path)
            }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-white/10"
          >
            <ChevronIcon expanded={isExpanded} />
          </button>
        ) : (
          <span className="w-5 shrink-0" />
        )}
        <ItemIcon id={item.id} icon={item.icon} imgClassName="h-4 w-4" />
        <span className="truncate">{item.label}</span>
      </Tile>
      {hasChildren &&
        isExpanded &&
        item.children.map((child) => (
          <SidebarNode
            key={`${path}/${child.label}`}
            item={child}
            path={`${path}/${child.label}`}
            depth={depth + 1}
            selectedTile={selectedTile}
            onSelect={onSelect}
            onOpen={onOpen}
            onContextMenu={onContextMenu}
            isMobile={isMobile}
            expandedPaths={expandedPaths}
            onToggleExpand={onToggleExpand}
          />
        ))}
    </>
  )
}

export default SidebarNode
