import { useEffect, useRef, useState } from 'react'
import { desktopIcons } from '../data/desktopIcons.js'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import ResumeWindow from './ResumeWindow.jsx'
import ThisPCWindow from './ThisPCWindow.jsx'
import DeveloperLabWindow from './DeveloperLabWindow.jsx'
import ContactInfoApp from './ContactInfoApp.jsx'
import GmailGuestGate from './GmailGuestGate.jsx'
import GmailComposeApp from './GmailComposeApp.jsx'
import PaintApp from './PaintApp.jsx'
import VisitorArtsApp from './VisitorArtsApp.jsx'
import MemoryWallApp from './MemoryWallApp.jsx'
import SettingsApp from './SettingsApp.jsx'
import ContextMenu from './ContextMenu.jsx'
import Taskbar from './Taskbar.jsx'
import { rectsIntersect } from '../utils/geometry.js'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { wallpapers } from '../data/wallpapers.js'

function Desktop() {
  const { brightness, wallpaperId } = useSystemSettings()
  const wallpaper =
    wallpapers.find((w) => w.id === wallpaperId) ?? wallpapers[0]
  const [selectedIconIds, setSelectedIconIds] = useState([])
  const [openWindows, setOpenWindows] = useState([])
  const [iconMenu, setIconMenu] = useState(null)
  const [desktopMenu, setDesktopMenu] = useState(null)
  const [refreshToken, setRefreshToken] = useState(0)
  const [gmailGateOpen, setGmailGateOpen] = useState(false)
  const [gmailGuest, setGmailGuest] = useState(null)
  const column1 = desktopIcons.filter((icon) => icon.column === 1)
  const column2 = desktopIcons.filter((icon) => icon.column === 2)
  const iconRefs = useRef(new Map())
  const instanceCounter = useRef(0)
  const marqueeStart = useRef({ x: 0, y: 0 })
  const draggedDuringSelect = useRef(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [marqueeBox, setMarqueeBox] = useState(null)

  function registerIconRef(id, node) {
    if (node) iconRefs.current.set(id, node)
    else iconRefs.current.delete(id)
  }

  function getOtherRects(excludeId) {
    const rects = []
    iconRefs.current.forEach((node, otherId) => {
      if (otherId !== excludeId && node)
        rects.push(node.getBoundingClientRect())
    })
    return rects
  }

  function handleDesktopMouseDown(e) {
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
    setOpenWindows((prev) =>
      prev.some((w) => w.id === id)
        ? prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        : [...prev, { id, instanceId: id, isMinimized: false }],
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
    openApp(id)
  }

  function closeApp(instanceId) {
    setOpenWindows((prev) => prev.filter((w) => w.instanceId !== instanceId))
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
        openApp(selectedIconIds[0])
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
        e.preventDefault()
        setDesktopMenu({ x: e.clientX, y: e.clientY })
      }}
      className="relative h-screen w-screen overflow-hidden text-white"
      style={{ backgroundColor: wallpaper.baseColor }}
    >
      {wallpaper.layers.map((layer, index) => (
        <div
          key={index}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: layer.opacity ?? 1,
            backgroundImage: layer.backgroundImage,
            backgroundSize: layer.backgroundSize,
          }}
        />
      ))}
      <span className="absolute right-4 bottom-4 text-sm text-white/40 select-none [text-shadow:0_0_3px_rgba(0,0,0,0.9),0_0_6px_rgba(0,0,0,0.7)]">
        SonnyOS Professional
      </span>
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="flex flex-col gap-2">
          {column1.map((icon, index) => (
            <DesktopIcon
              key={icon.id}
              ref={(node) => registerIconRef(icon.id, node)}
              id={icon.id}
              getOtherRects={getOtherRects}
              icon={icon.icon}
              label={icon.label}
              isSelected={selectedIconIds.includes(icon.id)}
              onSelect={() => setSelectedIconIds([icon.id])}
              onOpen={() => handleIconOpen(icon.id)}
              onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
              refreshToken={refreshToken}
              staggerIndex={index}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {column2.map((icon, index) => (
            <DesktopIcon
              key={icon.id}
              ref={(node) => registerIconRef(icon.id, node)}
              id={icon.id}
              getOtherRects={getOtherRects}
              icon={icon.icon}
              label={icon.label}
              isSelected={selectedIconIds.includes(icon.id)}
              onSelect={() => setSelectedIconIds([icon.id])}
              onOpen={() => handleIconOpen(icon.id)}
              onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
              refreshToken={refreshToken}
              staggerIndex={column1.length + index}
            />
          ))}
        </div>
      </div>
      {openWindows.map((w, index) => {
        const shared = {
          isMinimized: w.isMinimized,
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
            />
          )
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
              <PaintApp onOpenGallery={() => handleIconOpen('visitor-arts')} />
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
              <SettingsApp onOpenGmail={() => handleIconOpen('gmail')} />
            </Window>
          )
        }
        const icon = desktopIcons.find((i) => i.id === w.id)
        const isLargePlaceholder = w.id === 'blog' || w.id === 'music-lab'
        return (
          <Window
            key={w.instanceId}
            {...shared}
            title={icon?.label}
            defaultWidth={isLargePlaceholder ? 1200 : undefined}
            defaultHeight={isLargePlaceholder ? 800 : undefined}
          />
        )
      })}
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
            { label: 'View', onClick: () => {} },
            { label: 'Sort by', onClick: () => {} },
            { label: 'Refresh', onClick: () => setRefreshToken((t) => t + 1) },
            { label: 'Next Desktop Wallpaper', onClick: () => {} },
            { label: 'Paste', onClick: () => {} },
            { label: 'New', onClick: () => {} },
            { label: 'Personalize', onClick: () => {} },
            { label: 'Open Terminal', onClick: () => {} },
          ]}
        />
      )}
      <Taskbar
        openWindows={openWindows.map((w) => {
          const icon = desktopIcons.find((i) => i.id === w.id)
          return {
            id: w.id,
            instanceId: w.instanceId,
            label: icon?.label ?? (w.id === 'settings' ? 'Settings' : w.id),
            icon: icon?.icon === 'pdf' ? '📄' : icon?.icon,
            isMinimized: w.isMinimized,
          }
        })}
        onWindowClick={handleTaskbarClick}
        onOpenSettings={() => handleIconOpen('settings')}
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
