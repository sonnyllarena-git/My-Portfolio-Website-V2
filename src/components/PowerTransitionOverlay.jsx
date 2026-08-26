import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import restartVideo from './windows startup/assets/restarting.mp4'
import shutdownVideo from './windows startup/assets/shutting down.mp4'

const FADE_DURATION_S = 0.5
const SLEEP_TEXT_DELAY_MS = 2000

function PowerTransitionOverlay({ action, onComplete }) {
  const [showWakeHint, setShowWakeHint] = useState(false)
  const [closeAttempted, setCloseAttempted] = useState(false)

  useEffect(() => {
    if (action !== 'sleep') return
    const timer = setTimeout(() => setShowWakeHint(true), SLEEP_TEXT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [action])

  useEffect(() => {
    if (action !== 'sleep') return
    function handleKeyDown(e) {
      if (e.key === 'Escape') onComplete()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [action, onComplete])

  function handleShutdownEnded() {
    window.close()
    setCloseAttempted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: FADE_DURATION_S }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {action === 'restart' && (
        <video
          className="h-full w-full object-contain"
          src={restartVideo}
          autoPlay
          muted
          playsInline
          onEnded={onComplete}
          onError={onComplete}
        />
      )}
      {action === 'shutdown' && (
        <video
          className="h-full w-full object-contain"
          src={shutdownVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleShutdownEnded}
          onError={handleShutdownEnded}
        />
      )}
      {showWakeHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION_S }}
          className="text-sm text-white/70"
        >
          Press Esc to wake up
        </motion.p>
      )}
      {action === 'shutdown' && closeAttempted && (
        <p className="absolute bottom-[8%] text-sm text-white/70">
          You can close this tab now
        </p>
      )}
    </motion.div>
  )
}

export default PowerTransitionOverlay
