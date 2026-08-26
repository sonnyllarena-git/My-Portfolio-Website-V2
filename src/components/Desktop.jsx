import { useEffect, useRef, useState } from 'react'
import { desktopIcons } from '../data/desktopIcons.js'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import ResumeWindow from './ResumeWindow.jsx'
import ThisPCWindow from './ThisPCWindow.jsx'
import DeveloperLabWindow from './DeveloperLabWindow.jsx'
import ContactInfoApp from './ContactInfoApp.jsx'
import GmailGuestGate from './GmailGuestGate.jsx'
import GamesNameGate from './games/GamesNameGate.jsx'
import GamesLoadingScreen from './games/GamesLoadingScreen.jsx'
import { useGames } from '../context/GamesContext.jsx'
import { useBlog } from '../context/BlogContext.jsx'
import BlogNameGate from './blog/BlogNameGate.jsx'
import BlogLoadingScreen from './blog/BlogLoadingScreen.jsx'
import BlogApp from './BlogApp.jsx'
import GmailComposeApp from './GmailComposeApp.jsx'
import PaintApp from './PaintApp.jsx'
import VisitorArtsApp from './VisitorArtsApp.jsx'
import MemoryWallApp from './MemoryWallApp.jsx'
import GamesApp from './GamesApp.jsx'
import SettingsApp from './SettingsApp.jsx'
import MusicLabApp from './MusicLabApp.jsx'
import ZoomChatApp from './ZoomChatApp.jsx'
import ProjectsApp from './ProjectsApp.jsx'
import StoreApp from './StoreApp.jsx'
import TerminalApp from './TerminalApp.jsx'
import AppGlyph from './icons/AppGlyph.jsx'
import ContextMenu from './ContextMenu.jsx'
import Taskbar from './Taskbar.jsx'
import ExplorerBody from './explorer/ExplorerBody.jsx'
import ResumePage from './ResumePage.jsx'
import { rectsIntersect } from '../utils/geometry.js'
import { computeAutoLayout, cellToPixel } from '../utils/desktopGrid.js'
import { addRecentAppId, DEFAULT_RECENT_APP_IDS } from '../utils/recentApps.js'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { wallpapers } from '../data/wallpapers.js'
import { accentColors } from '../data/accentColors.js'
import { getCursorValue } from '../utils/getCursorValue.js'
import {
  quickAccess as thisPcQuickAccess,
  thisPcDrives,
  drives as thisPcDeviceDrives,
} from '../data/thisPcLocations.js'
import {
  quickAccess as devQuickAccess,
  pcDrives as devPcDrives,
  folders as devFolders,
} from '../data/developerLabLocations.js'

const CLOSE_ANIMATION_MS = 180

const WINDOW_PREVIEW_SIZES = {
  gmail: [700, 550],
  'contact-info': [650, 500],
  paint: [1200, 800],
  'visitor-arts': [1200, 800],
  'memory-wall': [950, 650],
  games: [1200, 800],
  settings: [1200, 800],
  'music-lab': [1200, 800],
  'zoom-chat': [400, 600],
  'this-pc': [1200, 800],
  'developer-lab': [1200, 800],
  projects: [1200, 800],
  resume: [420, 560],
  store: [1200, 800],
  terminal: [700, 450],
}

function renderPreviewBody(w, gmailGuest) {
  if (w.id === 'resume') return <ResumePage />
  if (w.id === 'this-pc')
    return (
      <ExplorerBody
        rootLabel="This PC"
        quickAccess={thisPcQuickAccess}
        pcDrives={thisPcDrives}
        folders={thisPcQuickAccess}
        devices={thisPcDeviceDrives}
        onOpenNewWindow={() => {}}
        onClose={() => {}}
      />
    )
  if (w.id === 'developer-lab')
    return (
      <ExplorerBody
        rootLabel="Developer Lab"
        quickAccess={devQuickAccess}
        pcDrives={devPcDrives}
        folders={devFolders}
        onOpenNewWindow={() => {}}
        onClose={() => {}}
      />
    )
  if (w.id === 'gmail') return <GmailComposeApp guest={gmailGuest} />
  if (w.id === 'contact-info') return <ContactInfoApp />
  if (w.id === 'paint') return <PaintApp onOpenGallery={() => {}} />
  if (w.id === 'visitor-arts') return <VisitorArtsApp onOpenPaint={() => {}} />
  if (w.id === 'memory-wall') return <MemoryWallApp />
  if (w.id === 'games') return <GamesApp />
  if (w.id === 'settings')
    return <SettingsApp onOpenGmail={() => {}} onOpenZoomChat={() => {}} />
  if (w.id === 'music-lab') return <MusicLabApp />
  if (w.id === 'blog')
    return <BlogApp onOpenGames={() => {}} onOpenGmail={() => {}} />
  if (w.id === 'zoom-chat') return <ZoomChatApp onOpenGmail={() => {}} />
  if (w.id === 'projects') return <ProjectsApp />
  if (w.id === 'store') return <StoreApp />
  if (w.id === 'terminal') return <TerminalApp onOpenApp={() => {}} />
  return null
}

function Desktop() {
  const { brightness, wallpaperId, cursorStyle, accentColor } =
    useSystemSettings()
  const wallpaper =
    wallpapers.find((w) => w.id === wallpaperId) ?? wallpapers[0]
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const isMobile = useIsMobile()
  const [selectedIconIds, setSelectedIconIds] = useState([])
  const [openWindows, setOpenWindows] = useState([])
  const [recentAppIds, setRecentAppIds] = useState(DEFAULT_RECENT_APP_IDS)
  const [iconMenu, setIconMenu] = useState(null)
  const [desktopMenu, setDesktopMenu] = useState(null)
  const [refreshToken, setRefreshToken] = useState(0)
  const [iconSize, setIconSize] = useState('medium')
  const [sortBy, setSortBy] = useState('name')
  const [gmailGateOpen, setGmailGateOpen] = useState(false)
  const [gmailGuest, setGmailGuest] = useState(null)
  const [gamesGateOpen, setGamesGateOpen] = useState(false)
  const [gamesLoadingName, setGamesLoadingName] = useState(null)
  const [blogGateOpen, setBlogGateOpen] = useState(false)
  const [blogLoadingIdentity, setBlogLoadingIdentity] = useState(null)
  const { visitorName, setVisitorName, logout } = useGames()
  const {
    visitorName: blogVisitorName,
    setVisitor: setBlogVisitor,
    logout: blogLogout,
  } = useBlog()
  function sortIcons(icons) {
    return [...icons].sort((a, b) =>
      sortBy === 'size' ? a.sizeKB - b.sizeKB : a.label.localeCompare(b.label),
    )
  }
  const sortedIcons = sortIcons(
    desktopIcons.filter((icon) => !icon.hideFromDesktop),
  )
  const [iconPositions, setIconPositions] = useState(() =>
    computeAutoLayout(sortedIcons, window.innerHeight),
  )
  const [layoutSortBy, setLayoutSortBy] = useState(sortBy)
  if (sortBy !== layoutSortBy) {
    setLayoutSortBy(sortBy)
    setIconPositions(computeAutoLayout(sortedIcons, window.innerHeight))
  }
  const sortedIconsRef = useRef(sortedIcons)
  useEffect(() => {
    sortedIconsRef.current = sortedIcons
  })

  useEffect(() => {
    let timeoutId
    function handleResize() {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIconPositions(
          computeAutoLayout(sortedIconsRef.current, window.innerHeight),
        )
      }, 200)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const iconRefs = useRef(new Map())
  const instanceCounter = useRef(0)
  const terminalHandleRef = useRef(null)
  const marqueeStart = useRef({ x: 0, y: 0 })
  const draggedDuringSelect = useRef(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [marqueeBox, setMarqueeBox] = useState(null)

  function registerIconRef(id, node) {
    if (node) iconRefs.current.set(id, node)
    else iconRefs.current.delete(id)
  }

  function handleIconDropAt(id, row, col) {
    setIconPositions((prev) => {
      const isOccupied = Object.entries(prev).some(
        ([otherId, pos]) =>
          otherId !== id && pos.row === row && pos.col === col,
      )
      if (isOccupied) return prev
      return { ...prev, [id]: { row, col } }
    })
  }

  function handleDesktopMouseDown(e) {
    if (isMobile) return
    if (e.target !== e.currentTarget) return
    marqueeStart.current = { x: e.clientX, y: e.clientY }
    draggedDuringSelect.current = false
    setIsSelecting(true)
    setMarqueeBox({ left: e.clientX, top: e.clientY, width: 0, height: 0 })
  }

  useEffect(() => {
    if (!isSelecting) return

    function handleMouseMove(e) {
      draggedDuringSelect.current = true
      const { x: startX, y: startY } = marqueeStart.current
      setMarqueeBox({
        left: Math.min(startX, e.clientX),
        top: Math.min(startY, e.clientY),
        width: Math.abs(e.clientX - startX),
        height: Math.abs(e.clientY - startY),
      })
    }

    function handleMouseUp() {
      setIsSelecting(false)
      setMarqueeBox((box) => {
        if (box) {
          const boxRect = {
            left: box.left,
            top: box.top,
            right: box.left + box.width,
            bottom: box.top + box.height,
          }
          const hits = []
          iconRefs.current.forEach((node, id) => {
            if (rectsIntersect(node.getBoundingClientRect(), boxRect)) {
              hits.push(id)
            }
          })
          setSelectedIconIds(hits)
        }
        return null
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isSelecting])

  function openApp(id) {
    if (desktopIcons.some((icon) => icon.id === id)) {
      setRecentAppIds((prev) => addRecentAppId(prev, id))
    }
    setOpenWindows((prev) =>
      prev.some((w) => w.id === id)
        ? prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        : [...prev, { id, instanceId: id, isMinimized: false }],
    )
  }

  function openSettingsTab(tab) {
    setOpenWindows((prev) =>
      prev.some((w) => w.id === 'settings')
        ? prev.map((w) =>
            w.id === 'settings' ? { ...w, isMinimized: false, tab } : w,
          )
        : [
            ...prev,
            { id: 'settings', instanceId: 'settings', isMinimized: false, tab },
          ],
    )
  }

  function openNewInstance(id) {
    instanceCounter.current += 1
    setOpenWindows((prev) => [
      ...prev,
      {
        id,
        instanceId: `${id}-${instanceCounter.current}`,
        isMinimized: false,
      },
    ])
  }

  function handleIconOpen(id) {
    if (id === 'gmail' && !gmailGuest) {
      setGmailGateOpen(true)
      return
    }
    if (id === 'games' && !visitorName) {
      setGamesGateOpen(true)
      return
    }
    if (id === 'blog' && !blogVisitorName) {
      setBlogGateOpen(true)
      return
    }
    openApp(id)
  }

  function closeApp(instanceId) {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.instanceId === instanceId ? { ...w, isClosing: true } : w,
      ),
    )
    setTimeout(() => {
      setOpenWindows((prev) => prev.filter((w) => w.instanceId !== instanceId))
    }, CLOSE_ANIMATION_MS)
  }

  function bringToFront(instanceId) {
    setOpenWindows((prev) => {
      const index = prev.findIndex((w) => w.instanceId === instanceId)
      if (index === -1 || index === prev.length - 1) return prev
      const win = prev[index]
      return [...prev.slice(0, index), ...prev.slice(index + 1), win]
    })
  }

  function handleTaskbarClick(instanceId) {
    setOpenWindows((prev) => {
      const index = prev.findIndex((w) => w.instanceId === instanceId)
      if (index === -1) return prev
      const win = prev[index]
      const isTopmost = !win.isMinimized && index === prev.length - 1
      if (isTopmost) {
        return prev.map((w) =>
          w.instanceId === instanceId ? { ...w, isMinimized: true } : w,
        )
      }
      const restored = { ...win, isMinimized: false }
      return [...prev.slice(0, index), ...prev.slice(index + 1), restored]
    })
  }

  function toggleMinimize(instanceId) {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.instanceId === instanceId ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
    )
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter' && selectedIconIds.length === 1) {
        handleIconOpen(selectedIconIds[0])
      } else if (e.key === 'Escape') {
        setSelectedIconIds([])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIconIds])

  return (
    <div
      onClick={() => {
        if (draggedDuringSelect.current) {
          draggedDuringSelect.current = false
          return
        }
        setSelectedIconIds([])
        setIconMenu(null)
        setDesktopMenu(null)
      }}
      onMouseDown={handleDesktopMouseDown}
      onContextMenu={(e) => {
        if (isMobile) return
        e.preventDefault()
        setDesktopMenu({ x: e.clientX, y: e.clientY })
      }}
      className="relative h-screen w-screen overflow-hidden text-white"
      style={{
        backgroundColor: wallpaper.baseColor,
        cursor: getCursorValue(cursorStyle, accentHex),
      }}
    >
      {wallpaper.layers.map((layer, index) => (
        <div
          key={index}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: layer.opacity ?? 1,
            backgroundImage: layer.backgroundImage,
            backgroundSize: layer.backgroundSize,
            backgroundPosition: layer.backgroundPosition,
            backgroundRepeat: layer.backgroundRepeat,
          }}
        />
      ))}
      <span className="absolute right-4 bottom-4 text-sm text-white/40 select-none [text-shadow:0_0_3px_rgba(0,0,0,0.9),0_0_6px_rgba(0,0,0,0.7)]">
        SonnyOS Professional
      </span>
      {isMobile ? (
        <div className="absolute inset-x-0 top-0 bottom-12 flex flex-col gap-1 overflow-y-auto p-4">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              variant="list"
              id={icon.id}
              icon={icon.icon}
              label={icon.label}
              isSelected={selectedIconIds.includes(icon.id)}
              onSelect={() => setSelectedIconIds([icon.id])}
              onOpen={() => handleIconOpen(icon.id)}
              onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0">
          {sortedIcons.map((icon, index) => {
            const cell = iconPositions[icon.id] ?? { row: 0, col: 0 }
            const { x: left, y: top } = cellToPixel(cell.row, cell.col)
            return (
              <DesktopIcon
                key={icon.id}
                ref={(node) => registerIconRef(icon.id, node)}
                id={icon.id}
                icon={icon.icon}
                label={icon.label}
                isSelected={selectedIconIds.includes(icon.id)}
                onSelect={() => setSelectedIconIds([icon.id])}
                onOpen={() => handleIconOpen(icon.id)}
                onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
                refreshToken={refreshToken}
                staggerIndex={index}
                size={iconSize}
                left={left}
                top={top}
                onDropAt={handleIconDropAt}
              />
            )
          })}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bottom-12">
        {openWindows.map((w, index) => {
          const shared = {
            isMinimized: w.isMinimized,
            isClosing: w.isClosing,
            onMinimizeToggle: () => toggleMinimize(w.instanceId),
            onClose: () => closeApp(w.instanceId),
            zIndex: 20 + index,
            onFocus: () => bringToFront(w.instanceId),
          }
          const cascadeOffset =
            openWindows.slice(0, index).filter((o) => o.id === w.id).length * 28
          if (w.id === 'resume')
            return <ResumeWindow key={w.instanceId} {...shared} />
          if (w.id === 'this-pc')
            return (
              <ThisPCWindow
                key={w.instanceId}
                {...shared}
                cascadeOffset={cascadeOffset}
                onOpenNewWindow={() => openNewInstance('this-pc')}
              />
            )
          if (w.id === 'developer-lab')
            return (
              <DeveloperLabWindow
                key={w.instanceId}
                {...shared}
                cascadeOffset={cascadeOffset}
                onOpenNewWindow={() => openNewInstance('developer-lab')}
                onOpenProjects={() => handleIconOpen('projects')}
              />
            )
          if (w.id === 'projects') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🗃️"
                title="Projects"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <ProjectsApp />
              </Window>
            )
          }
          if (w.id === 'gmail') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="✉️"
                title="New Message"
                defaultWidth={700}
                defaultHeight={550}
              >
                <GmailComposeApp guest={gmailGuest} />
              </Window>
            )
          }
          if (w.id === 'contact-info') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="📇"
                title="Contact Info.txt"
                defaultWidth={650}
                defaultHeight={500}
              >
                <ContactInfoApp />
              </Window>
            )
          }
          if (w.id === 'paint') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🎨"
                title="Paint"
                defaultWidth={900}
                defaultHeight={600}
              >
                <PaintApp
                  onOpenGallery={() => handleIconOpen('visitor-arts')}
                />
              </Window>
            )
          }
          if (w.id === 'visitor-arts') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🖼️"
                title="Visitor Arts"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <VisitorArtsApp onOpenPaint={() => handleIconOpen('paint')} />
              </Window>
            )
          }
          if (w.id === 'memory-wall') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🖼️"
                title="Memory Wall"
                defaultWidth={950}
                defaultHeight={650}
              >
                <MemoryWallApp />
              </Window>
            )
          }
          if (w.id === 'store') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🛒"
                title="Store"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <StoreApp />
              </Window>
            )
          }
          if (w.id === 'terminal') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                onFocus={(e) => {
                  e?.preventDefault()
                  shared.onFocus()
                  terminalHandleRef.current?.focus()
                }}
                icon={<AppGlyph id="terminal" icon=">_" className="h-4 w-4" />}
                title="Command Prompt"
                defaultWidth={700}
                defaultHeight={450}
                square
                titleBarClassName="bg-[#f3f3f3] text-black"
              >
                <TerminalApp
                  ref={terminalHandleRef}
                  onOpenApp={handleIconOpen}
                  isActive={index === openWindows.length - 1 && !w.isMinimized}
                />
              </Window>
            )
          }
          if (w.id === 'games') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🎮"
                title="Games"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <GamesApp
                  onOpenGmail={() => handleIconOpen('gmail')}
                  onOpenZoomChat={() => handleIconOpen('zoom-chat')}
                  onLogout={() => {
                    logout()
                    shared.onClose()
                  }}
                />
              </Window>
            )
          }
          if (w.id === 'settings') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="⚙️"
                title="Settings"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <SettingsApp
                  key={w.tab ?? 'system'}
                  initialTab={w.tab}
                  onOpenGmail={() => handleIconOpen('gmail')}
                  onOpenZoomChat={() => handleIconOpen('zoom-chat')}
                />
              </Window>
            )
          }
          if (w.id === 'music-lab') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                icon="🎵"
                title="Music Lab"
                defaultWidth={1200}
                defaultHeight={800}
              >
                <MusicLabApp />
              </Window>
            )
          }
          if (w.id === 'blog') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                hideTitleBar
                defaultWidth={1200}
                defaultHeight={800}
              >
                {({ toggleMaximize }) => (
                  <BlogApp
                    onOpenContactInfo={() => handleIconOpen('contact-info')}
                    onOpenGames={() => handleIconOpen('games')}
                    onOpenGmail={() => handleIconOpen('gmail')}
                    onMinimize={shared.onMinimizeToggle}
                    onMaximize={toggleMaximize}
                    onLogout={() => {
                      blogLogout()
                      shared.onClose()
                    }}
                  />
                )}
              </Window>
            )
          }
          if (w.id === 'zoom-chat') {
            return (
              <Window
                key={w.instanceId}
                {...shared}
                hideTitleBar
                defaultWidth={400}
                defaultHeight={600}
              >
                {({ toggleMaximize, isMaximized }) => (
                  <ZoomChatApp
                    onClose={shared.onClose}
                    onMinimize={shared.onMinimizeToggle}
                    onMaximize={toggleMaximize}
                    isMaximized={isMaximized}
                    onOpenGmail={() => handleIconOpen('gmail')}
                  />
                )}
              </Window>
            )
          }
          const icon = desktopIcons.find((i) => i.id === w.id)
          return <Window key={w.instanceId} {...shared} title={icon?.label} />
        })}
      </div>
      {iconMenu && (
        <ContextMenu
          x={iconMenu.x}
          y={iconMenu.y}
          onClose={() => setIconMenu(null)}
          items={[
            { label: 'Open', onClick: () => handleIconOpen(iconMenu.id) },
            { label: 'Rename', onClick: () => {} },
            { label: 'Delete', onClick: () => {} },
            { label: 'Properties', onClick: () => {} },
          ]}
        />
      )}
      {desktopMenu && (
        <ContextMenu
          x={desktopMenu.x}
          y={desktopMenu.y}
          onClose={() => setDesktopMenu(null)}
          items={[
            {
              label: 'View',
              hasSubmenu: true,
              submenuItems: [
                {
                  label: 'Small icons',
                  selected: iconSize === 'small',
                  onClick: () => setIconSize('small'),
                },
                {
                  label: 'Medium icons',
                  selected: iconSize === 'medium',
                  onClick: () => setIconSize('medium'),
                },
                {
                  label: 'Large icons',
                  selected: iconSize === 'large',
                  onClick: () => setIconSize('large'),
                },
              ],
            },
            {
              label: 'Sort',
              hasSubmenu: true,
              submenuItems: [
                {
                  label: 'Name',
                  selected: sortBy === 'name',
                  onClick: () => setSortBy('name'),
                },
                {
                  label: 'Size',
                  selected: sortBy === 'size',
                  onClick: () => setSortBy('size'),
                },
              ],
            },
            { label: 'Refresh', onClick: () => setRefreshToken((t) => t + 1) },
            { divider: true },
            {
              label: 'System',
              roomy: true,
              onClick: () => openSettingsTab('system'),
            },
            {
              label: 'Personalization',
              roomy: true,
              onClick: () => openSettingsTab('personalization'),
            },
            {
              label: 'Open Terminal',
              roomy: true,
              onClick: () => openApp('terminal'),
            },
            { divider: true },
            {
              label: 'Contact Developer',
              roomy: true,
              onClick: () => handleIconOpen('contact-info'),
            },
          ]}
        />
      )}
      <Taskbar
        openWindows={openWindows.map((w) => {
          const icon = desktopIcons.find((i) => i.id === w.id)
          const [naturalWidth, naturalHeight] = WINDOW_PREVIEW_SIZES[w.id] ?? [
            480, 320,
          ]
          return {
            id: w.id,
            instanceId: w.instanceId,
            label:
              icon?.label ??
              (w.id === 'settings'
                ? 'Settings'
                : w.id === 'projects'
                  ? 'Projects'
                  : w.id),
            icon:
              icon?.icon === 'pdf'
                ? '📄'
                : (icon?.icon ?? (w.id === 'projects' ? '🗃️' : undefined)),
            isMinimized: w.isMinimized,
            preview: renderPreviewBody(w, gmailGuest),
            naturalWidth,
            naturalHeight,
          }
        })}
        onWindowClick={handleTaskbarClick}
        onOpenSettings={() => handleIconOpen('settings')}
        onOpenApp={handleIconOpen}
        onOpenNewWindow={openNewInstance}
        onIconContextMenu={(id, x, y) => setIconMenu({ id, x, y })}
        recentAppIds={recentAppIds}
      />
      {gmailGateOpen && (
        <GmailGuestGate
          onSubmit={(guest) => {
            setGmailGuest(guest)
            setGmailGateOpen(false)
            openApp('gmail')
          }}
          onCancel={() => setGmailGateOpen(false)}
        />
      )}
      {gamesGateOpen && (
        <GamesNameGate
          isLoading={gamesLoadingName !== null}
          onSubmit={(name) => setGamesLoadingName(name)}
          onCancel={() => {
            setGamesGateOpen(false)
            setGamesLoadingName(null)
          }}
        >
          {gamesLoadingName !== null && (
            <GamesLoadingScreen
              onDone={() => {
                setVisitorName(gamesLoadingName)
                setGamesGateOpen(false)
                setGamesLoadingName(null)
                openApp('games')
              }}
            />
          )}
        </GamesNameGate>
      )}
      {blogGateOpen && (
        <BlogNameGate
          isLoading={blogLoadingIdentity !== null}
          onSubmit={(name, avatarColor) =>
            setBlogLoadingIdentity({ name, avatarColor })
          }
          onCancel={() => {
            setBlogGateOpen(false)
            setBlogLoadingIdentity(null)
          }}
        >
          {blogLoadingIdentity !== null && (
            <BlogLoadingScreen
              onDone={() => {
                setBlogVisitor(
                  blogLoadingIdentity.name,
                  blogLoadingIdentity.avatarColor,
                )
                setBlogGateOpen(false)
                setBlogLoadingIdentity(null)
                openApp('blog')
              }}
            />
          )}
        </BlogNameGate>
      )}
      {marqueeBox && (
        <div
          className="pointer-events-none fixed border border-cyan-400 bg-cyan-400/10"
          style={{
            left: marqueeBox.left,
            top: marqueeBox.top,
            width: marqueeBox.width,
            height: marqueeBox.height,
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[100] bg-black"
        style={{ opacity: (100 - brightness) / 100 }}
      />
    </div>
  )
}

export default Desktop
