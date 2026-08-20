import { useEffect, useRef, useState } from 'react'
import TypingWhiteboard from './TypingWhiteboard.jsx'
import TypingHud from './TypingHud.jsx'
import VirtualKeyboard from './VirtualKeyboard.jsx'
import { getLevelInfo } from '../../../utils/games/typingLevels.js'
import { resolvePhysicalKey } from '../../../utils/games/keyboardLayout.js'

const KEY_FLASH_MS = 150

export default function TypingTestArea({
  level,
  durationMs,
  onLevelComplete,
  onTimeout,
}) {
  const { sentence } = getLevelInfo(level)
  const [typed, setTyped] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(durationMs / 1000))
  const [activeKey, setActiveKey] = useState(null)
  const [activeStatus, setActiveStatus] = useState(null)
  const startTimeRef = useRef(null)
  const flashTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    startTimeRef.current = performance.now()
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTimeRef.current
      const remainingMs = durationMs - elapsed
      if (remainingMs <= 0) {
        setSecondsLeft(0)
        clearInterval(interval)
        onTimeout()
        return
      }
      setSecondsLeft(Math.ceil(remainingMs / 1000))
    }, 250)

    return () => clearInterval(interval)
  }, [durationMs, onTimeout])

  function handleChange(event) {
    const value = event.target.value
    if (value.length > sentence.length) return

    if (value.length > typed.length) {
      const typedChar = value[value.length - 1]
      const expectedChar = sentence[value.length - 1]
      setActiveKey(resolvePhysicalKey(typedChar))
      setActiveStatus(typedChar === expectedChar ? 'correct' : 'incorrect')
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
      flashTimeoutRef.current = setTimeout(() => {
        setActiveKey(null)
        setActiveStatus(null)
      }, KEY_FLASH_MS)
    }

    setTyped(value)

    if (value.length === sentence.length) {
      const elapsedMs = performance.now() - startTimeRef.current
      onLevelComplete({ level, elapsedMs })
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <TypingHud level={level} secondsLeft={secondsLeft} />
      <TypingWhiteboard sentence={sentence} typed={typed} />
      <VirtualKeyboard activeKey={activeKey} activeStatus={activeStatus} />
      <input
        type="text"
        value={typed}
        onChange={handleChange}
        autoFocus
        className="rounded-lg border border-white/10 bg-[#141414] px-4 py-2 text-white outline-none focus:border-white/30"
        placeholder="Start typing..."
      />
    </div>
  )
}
