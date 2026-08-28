import { useState } from 'react'
import ContextMenu from '../ContextMenu.jsx'
import AccessDeniedModal from './AccessDeniedModal.jsx'
import RibbonMenu from './RibbonMenu.jsx'
import RootView from './RootView.jsx'
import SidebarNode from './SidebarNode.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'

const MIN_SIDEBAR_WIDTH = 144
// Wide enough that the longest drive label ("System Reserved (D:)") never truncates.
const DEFAULT_SIDEBAR_WIDTH = 200
const MAX_SIDEBAR_WIDTH = 400

function ExplorerBody({
  rootLabel,
  quickAccess,
  pcDrives,
  folders,
  devices,
  onOpenNewWindow,
  onClose,
  onOpenApp = () => {},
}) {
  const isMobile = useIsMobile()
  const rootLocation = { type: 'root', label: rootLabel }
  const [history, setHistory] = useState([rootLocation])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [selectedTile, setSelectedTile] = useState(null)
  const [tileMenu, setTileMenu] = useState(null)
  const [activeRibbonTab, setActiveRibbonTab] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedPaths, setExpandedPaths] = useState(new Set())
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH)
  const [accessDeniedOpen, setAccessDeniedOpen] = useState(false)
  const current = history[historyIndex]

  function startSidebarResize(e) {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = sidebarWidth

    function handleMouseMove(moveEvent) {
      const next = startWidth + (moveEvent.clientX - startX)
      setSidebarWidth(
        Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, next)),
      )
    }
    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function toggleExpand(path) {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  function navigateTo(location) {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), location])
    setHistoryIndex((prev) => prev + 1)
  }

  function openItem(item) {
    if (item.kind === 'app') {
      onOpenApp(item.appId)
    } else if (item.children) {
      navigateTo({
        type: 'location',
        label: item.label,
        children: item.children,
      })
    } else {
      setAccessDeniedOpen(true)
    }
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

  function tileMenuItems(item) {
    return [
      { label: 'Open', onClick: () => openItem(item) },
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
          onClick: () => openItem(item),
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
    <div className="flex h-full flex-col" onClick={clearOverlays}>
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
          disabled={current.type !== 'root' && !current.children}
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
      <div
        className={
          isMobile
            ? 'flex flex-1 flex-col overflow-hidden'
            : 'flex flex-1 overflow-hidden'
        }
      >
        <div
          style={isMobile ? undefined : { width: sidebarWidth }}
          className={
            isMobile
              ? 'flex w-full shrink-0 items-center gap-2 overflow-x-auto border-b border-white/10 bg-[#1f2126] px-2 py-2 text-xs'
              : 'shrink-0 overflow-x-hidden overflow-y-auto bg-[#1f2126] py-2 text-xs'
          }
        >
          {!isMobile && (
            <div className="px-3 py-1 text-white/50">Quick access</div>
          )}
          {quickAccess.map((item) => (
            <SidebarNode
              key={item.label}
              item={item}
              path={item.label}
              depth={0}
              selectedTile={selectedTile}
              onSelect={setSelectedTile}
              onOpen={openItem}
              onContextMenu={(x, y, it) => setTileMenu({ x, y, item: it })}
              isMobile={isMobile}
              expandedPaths={expandedPaths}
              onToggleExpand={toggleExpand}
            />
          ))}
          {!isMobile && (
            <div className="mt-2 px-3 py-1 text-white/50">This PC</div>
          )}
          {pcDrives.map((item) => (
            <SidebarNode
              key={item.label}
              item={item}
              path={item.label}
              depth={0}
              selectedTile={selectedTile}
              onSelect={setSelectedTile}
              onOpen={openItem}
              onContextMenu={(x, y, it) => setTileMenu({ x, y, item: it })}
              isMobile={isMobile}
              expandedPaths={expandedPaths}
              onToggleExpand={toggleExpand}
            />
          ))}
        </div>
        {!isMobile && (
          <div
            onMouseDown={startSidebarResize}
            className="w-1.5 shrink-0 cursor-col-resize border-r border-white/10 bg-transparent hover:border-cyan-400/60"
          />
        )}
        <div className="flex-1 overflow-y-auto p-3 text-xs text-white/80">
          <RootView
            folders={current.type === 'root' ? folders : current.children}
            devices={current.type === 'root' ? devices : undefined}
            selectedTile={selectedTile}
            onSelectTile={setSelectedTile}
            onOpenTile={openItem}
            onTileContextMenu={(x, y, item) => setTileMenu({ x, y, item })}
            searchTerm={searchTerm}
            isMobile={isMobile}
          />
        </div>
      </div>
      {tileMenu && (
        <ContextMenu
          x={tileMenu.x}
          y={tileMenu.y}
          onClose={() => setTileMenu(null)}
          items={tileMenuItems(tileMenu.item)}
        />
      )}
      {accessDeniedOpen && (
        <AccessDeniedModal onClose={() => setAccessDeniedOpen(false)} />
      )}
    </div>
  )
}

export default ExplorerBody
