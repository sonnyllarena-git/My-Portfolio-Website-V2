import { useState } from 'react'
import ContextMenu from '../ContextMenu.jsx'
import Window from '../Window.jsx'
import EmptyFolderView from './EmptyFolderView.jsx'
import ItemIcon from './ItemIcon.jsx'
import RibbonMenu from './RibbonMenu.jsx'
import RootView from './RootView.jsx'
import Tile from './Tile.jsx'

function ExplorerWindow({
  icon,
  title,
  defaultWidth,
  defaultHeight,
  rootLabel,
  quickAccess,
  pcDrives,
  folders,
  devices,
  onClose,
  isMinimized,
  onMinimizeToggle,
  onOpenNewWindow,
  cascadeOffset,
}) {
  const rootLocation = { type: 'root', label: rootLabel }
  const [history, setHistory] = useState([rootLocation])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [selectedTile, setSelectedTile] = useState(null)
  const [tileMenu, setTileMenu] = useState(null)
  const [activeRibbonTab, setActiveRibbonTab] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const current = history[historyIndex]

  function navigateTo(location) {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), location])
    setHistoryIndex((prev) => prev + 1)
  }

  function goBack() {
    setHistoryIndex((prev) => Math.max(0, prev - 1))
  }

  function goForward() {
    setHistoryIndex((prev) => Math.min(history.length - 1, prev + 1))
  }

  const breadcrumb =
    current.type === 'root' ? rootLabel : `${rootLabel} > ${current.label}`

  function clearOverlays() {
    setSelectedTile(null)
    setTileMenu(null)
    setActiveRibbonTab(null)
  }

  function tileMenuItems(location) {
    return [
      { label: 'Open', onClick: () => navigateTo(location) },
      { label: 'Rename', onClick: () => {} },
      { label: 'Delete', onClick: () => {} },
      { label: 'Properties', onClick: () => {} },
    ]
  }

  const ribbonTabs = [
    {
      label: 'File',
      items: [
        { label: 'Open new window', onClick: onOpenNewWindow },
        { label: 'Close', onClick: onClose },
        { label: 'Frequent places', header: true },
        ...quickAccess.map((item) => ({
          label: item.label,
          onClick: () => navigateTo({ type: 'location', label: item.label }),
        })),
      ],
    },
    {
      label: 'Home',
      items: [
        { label: 'New folder', onClick: () => {} },
        { label: 'Copy', onClick: () => {} },
        { label: 'Paste', onClick: () => {} },
        { label: 'Rename', onClick: () => {} },
        { label: 'Delete', onClick: () => {} },
      ],
    },
    {
      label: 'Share',
      items: [
        { label: 'Share via Email', onClick: () => {} },
        { label: 'Copy path', onClick: () => {} },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Large icons', onClick: () => {} },
        { label: 'List', onClick: () => {} },
        { label: 'Details', onClick: () => {} },
        { label: 'Show hidden items', onClick: () => {} },
      ],
    },
  ]

  return (
    <Window
      icon={icon}
      title={title}
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      defaultWidth={defaultWidth}
      defaultHeight={defaultHeight}
      cascadeOffset={cascadeOffset}
    >
      <div className="contents" onClick={clearOverlays}>
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#202225] px-2 py-1.5 text-white/80">
          <button
            aria-label="Back"
            onClick={goBack}
            disabled={historyIndex === 0}
            className="rounded px-1 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ←
          </button>
          <button
            aria-label="Forward"
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="rounded px-1 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            →
          </button>
          <button
            aria-label="Refresh"
            onClick={() => navigateTo(current)}
            className="rounded px-1 hover:bg-white/10"
          >
            ⟳
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[#2b2d31] px-3 py-1 text-xs">
            <button aria-label="Home" onClick={() => navigateTo(rootLocation)}>
              🏠
            </button>
            <span>{breadcrumb}</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={current.type !== 'root'}
            className="w-32 rounded-full bg-[#2b2d31] px-3 py-1 text-xs placeholder-white/40 focus:outline-none disabled:opacity-40"
          />
        </div>
        <RibbonMenu
          tabs={ribbonTabs}
          activeTab={activeRibbonTab}
          onToggleTab={(label) =>
            setActiveRibbonTab((prev) => (prev === label ? null : label))
          }
        />
        <div className="flex">
          <div className="w-36 shrink-0 border-r border-white/10 bg-[#1f2126] py-2 text-xs">
            <div className="px-3 py-1 text-white/50">Quick access</div>
            {quickAccess.map((item) => (
              <Tile
                key={item.label}
                isSelected={selectedTile === item.label}
                onSelect={() => setSelectedTile(item.label)}
                onOpen={() =>
                  navigateTo({ type: 'location', label: item.label })
                }
                onContextMenu={(x, y) =>
                  setTileMenu({
                    x,
                    y,
                    location: { type: 'location', label: item.label },
                  })
                }
                className="flex cursor-pointer items-center gap-2 px-3 py-1.5"
              >
                <ItemIcon
                  id={item.id}
                  icon={item.icon}
                  imgClassName="h-4 w-4"
                />
                <span>{item.label}</span>
              </Tile>
            ))}
            <div className="mt-2 px-3 py-1 text-white/50">This PC</div>
            {pcDrives.map((item) => (
              <Tile
                key={item.label}
                isSelected={selectedTile === item.label}
                onSelect={() => setSelectedTile(item.label)}
                onOpen={() =>
                  navigateTo({ type: 'location', label: item.label })
                }
                onContextMenu={(x, y) =>
                  setTileMenu({
                    x,
                    y,
                    location: { type: 'location', label: item.label },
                  })
                }
                className="flex cursor-pointer items-center gap-2 px-3 py-1.5"
              >
                <ItemIcon
                  id={item.id}
                  icon={item.icon}
                  imgClassName="h-4 w-4"
                />
                <span>{item.label}</span>
              </Tile>
            ))}
          </div>
          <div className="flex-1 p-3 text-xs text-white/80">
            {current.type === 'root' ? (
              <RootView
                folders={folders}
                devices={devices}
                selectedTile={selectedTile}
                onSelectTile={setSelectedTile}
                onOpenTile={(label) => navigateTo({ type: 'location', label })}
                onTileContextMenu={(x, y, label) =>
                  setTileMenu({ x, y, location: { type: 'location', label } })
                }
                searchTerm={searchTerm}
              />
            ) : (
              <EmptyFolderView />
            )}
          </div>
        </div>
      </div>
      {tileMenu && (
        <ContextMenu
          x={tileMenu.x}
          y={tileMenu.y}
          onClose={() => setTileMenu(null)}
          items={tileMenuItems(tileMenu.location)}
        />
      )}
    </Window>
  )
}

export default ExplorerWindow
