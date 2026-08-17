import { useEffect, useState } from 'react'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDate(date) {
  return date.toLocaleDateString()
}

function SystemTray() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="ml-auto flex items-center gap-2 pr-2 text-sm text-white">
      <span aria-label="Show hidden icons">^</span>
      <span aria-label="Wi-Fi">📶</span>
      <span aria-label="Volume">🔊</span>
      <span aria-label="Battery">🔋</span>
      <div className="ml-2 text-right leading-tight">
        <div>{formatTime(now)}</div>
        <div className="text-xs text-white/70">{formatDate(now)}</div>
      </div>
    </div>
  )
}

export default SystemTray
