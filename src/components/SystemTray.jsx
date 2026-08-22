import { useEffect, useState } from 'react'
import WifiIcon from './icons/WifiIcon.jsx'
import SpeakerIcon from './icons/SpeakerIcon.jsx'

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

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="ml-auto flex items-center gap-1 pr-2 text-sm text-white">
      <TrayButton label="Show hidden icons">^</TrayButton>
      <TrayButton label="Wi-Fi">
        <WifiIcon className="h-4 w-4" />
      </TrayButton>
      <TrayButton label="Volume">
        <SpeakerIcon className="h-4 w-4" />
      </TrayButton>
      <div className="ml-2 text-right leading-tight">
        <div>{formatTime(now)}</div>
        <div className="text-xs text-white/70">{formatDate(now)}</div>
      </div>
    </div>
  )
}

export default SystemTray
