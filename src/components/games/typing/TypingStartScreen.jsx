import { useEffect, useState } from 'react'
import mapBackground from './assets/components/map.avif'

const COUNTDOWN_START = 3
const TICK_MS = 800

export default function TypingStartScreen({ onStart }) {
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (count === null) return undefined

    if (count === 0) {
      const timeout = setTimeout(onStart, TICK_MS)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => setCount((c) => c - 1), TICK_MS)
    return () => clearTimeout(timeout)
  }, [count, onStart])

  function handleTap() {
    if (count === null) setCount(COUNTDOWN_START)
  }

  return (
    <div
      className="relative flex h-full w-full cursor-pointer items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${mapBackground})` }}
      onClick={handleTap}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center">
        {count === null ? (
          <p className="text-3xl font-black text-white drop-shadow-lg">
            Tap to Start
          </p>
        ) : (
          <p className="text-7xl font-black text-white drop-shadow-lg">
            {count === 0 ? 'Go!' : count}
          </p>
        )}
      </div>
    </div>
  )
}
