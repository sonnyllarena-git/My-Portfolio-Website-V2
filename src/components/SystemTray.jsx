import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WifiIcon from './icons/WifiIcon.jsx'
import SpeakerIcon from './icons/SpeakerIcon.jsx'
import ClockCalendarFlyout from './ClockCalendarFlyout.jsx'

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function formatDate(date) {
  return date.toLocaleDateString('en-US')
}

function TrayButton({ label, children }) {
  return (
    <button
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded hover:bg-white/10"
    >
      {children}
    </button>
  )
}

function SystemTray() {
  const [now, setNow] = useState(() => new Date())
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const clockAreaRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!isFlyoutOpen) return
    function handleOutsideMouseDown(e) {
      if (!clockAreaRef.current?.contains(e.target)) setIsFlyoutOpen(false)
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [isFlyoutOpen])

  return (
    <div className="ml-auto flex items-center gap-1 pr-2 text-sm text-white">
      <TrayButton label="Show hidden icons">^</TrayButton>
      <TrayButton label="Wi-Fi">
        <WifiIcon className="h-4 w-4" />
      </TrayButton>
      <TrayButton label="Volume">
        <SpeakerIcon className="h-4 w-4" />
      </TrayButton>
      <div ref={clockAreaRef}>
        <button
          type="button"
          onClick={() => setIsFlyoutOpen((prev) => !prev)}
          aria-label="Clock and calendar"
          className="ml-2 rounded px-1 text-right leading-tight hover:bg-white/10"
        >
          <div>{formatTime(now)}</div>
          <div className="text-xs text-white/70">{formatDate(now)}</div>
        </button>
        <AnimatePresence>
          {isFlyoutOpen && <ClockCalendarFlyout now={now} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SystemTray
