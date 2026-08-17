import { useEffect, useState } from 'react'
import { desktopIcons } from '../data/desktopIcons.js'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import ResumeWindow from './ResumeWindow.jsx'
import ThisPCWindow from './ThisPCWindow.jsx'
import ContactInfoApp from './ContactInfoApp.jsx'
import ContextMenu from './ContextMenu.jsx'
import Taskbar from './Taskbar.jsx'

function Desktop() {
  const [activeIconId, setActiveIconId] = useState(null)
  const [openWindows, setOpenWindows] = useState([])
  const [iconMenu, setIconMenu] = useState(null)
  const [desktopMenu, setDesktopMenu] = useState(null)
  const column1 = desktopIcons.filter((icon) => icon.column === 1)
  const column2 = desktopIcons.filter((icon) => icon.column === 2)

  function openApp(id) {
    setOpenWindows((prev) =>
      prev.some((w) => w.id === id)
        ? prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
        : [...prev, { id, isMinimized: false }],
    )
  }

  function closeApp(id) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
  }

  function toggleMinimize(id) {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
    )
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter' && activeIconId) {
        openApp(activeIconId)
      } else if (e.key === 'Escape') {
        setActiveIconId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIconId])

  return (
    <div
      onClick={() => {
        setActiveIconId(null)
        setIconMenu(null)
        setDesktopMenu(null)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setDesktopMenu({ x: e.clientX, y: e.clientY })
      }}
      className="relative h-screen w-screen overflow-hidden bg-[#08090c] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 240, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 60% 40%, rgba(0, 240, 255, 0.08), transparent 70%), radial-gradient(circle at 20% 80%, rgba(0, 255, 102, 0.06), transparent 60%)',
        }}
      />
      <span className="absolute right-4 bottom-4 text-sm text-white/40 select-none">
        SonnyOS Professional
      </span>
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="flex flex-col gap-2">
          {column1.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              isActive={icon.id === activeIconId}
              onSelect={() => setActiveIconId(icon.id)}
              onOpen={() => openApp(icon.id)}
              onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {column2.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              isActive={icon.id === activeIconId}
              onSelect={() => setActiveIconId(icon.id)}
              onOpen={() => openApp(icon.id)}
              onContextMenu={(x, y) => setIconMenu({ id: icon.id, x, y })}
            />
          ))}
        </div>
      </div>
      {openWindows.map((w) => {
        const shared = {
          isMinimized: w.isMinimized,
          onMinimizeToggle: () => toggleMinimize(w.id),
          onClose: () => closeApp(w.id),
        }
        if (w.id === 'resume') return <ResumeWindow key={w.id} {...shared} />
        if (w.id === 'this-pc') return <ThisPCWindow key={w.id} {...shared} />
        if (w.id === 'contact-info') {
          return (
            <Window
              key={w.id}
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
        const icon = desktopIcons.find((i) => i.id === w.id)
        return <Window key={w.id} {...shared} title={icon?.label} />
      })}
      {iconMenu && (
        <ContextMenu
          x={iconMenu.x}
          y={iconMenu.y}
          onClose={() => setIconMenu(null)}
          items={[
            { label: 'Open', onClick: () => openApp(iconMenu.id) },
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
            { label: 'Refresh', onClick: () => {} },
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
            label: icon?.label,
            icon: icon?.icon === 'pdf' ? '📄' : icon?.icon,
            isMinimized: w.isMinimized,
          }
        })}
        onWindowClick={toggleMinimize}
      />
    </div>
  )
}

export default Desktop
