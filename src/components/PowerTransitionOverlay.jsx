import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FADE_DURATION_S = 0.5
const RESTART_HOLD_MS = 3000
const SLEEP_TEXT_DELAY_MS = 2000
const SHUTDOWN_HOLD_MS = 3000

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

  useEffect(() => {
    if (action !== 'restart') return
    const timer = setTimeout(onComplete, RESTART_HOLD_MS)
    return () => clearTimeout(timer)
  }, [action, onComplete])

  useEffect(() => {
    if (action !== 'shutdown') return
    const timer = setTimeout(() => {
      window.close()
      setCloseAttempted(true)
    }, SHUTDOWN_HOLD_MS)
    return () => clearTimeout(timer)
  }, [action])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: FADE_DURATION_S }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
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
      {action === 'shutdown' && (
        <p className="text-sm text-white/70">
          {closeAttempted ? 'You can close this tab now' : 'Shutting down…'}
        </p>
      )}
    </motion.div>
  )
}

export default PowerTransitionOverlay
