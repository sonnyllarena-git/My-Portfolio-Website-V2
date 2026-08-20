import { useEffect, useState } from 'react'

const LOADING_MS = 2000

function GamesLoadingScreen({ onDone }) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setFilled(true), 20)
    const doneTimeout = setTimeout(onDone, LOADING_MS)
    return () => {
      clearTimeout(startTimeout)
      clearTimeout(doneTimeout)
    }
  }, [onDone])

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="absolute inset-0 z-10 flex items-center justify-center p-4"
    >
      <div className="flex flex-col items-center gap-5 rounded-xl bg-black/85 px-10 py-8 shadow-2xl ring-1 ring-amber-900/50">
        <p className="text-sm font-semibold tracking-[0.4em] text-amber-200/90">
          LOADING
        </p>
        <div className="h-2.5 w-56 max-w-[50vw] overflow-hidden rounded-full bg-black/50 ring-1 ring-amber-900/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-700 via-orange-400 to-amber-300 transition-[width] duration-[2000ms] ease-linear"
            style={{ width: filled ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default GamesLoadingScreen
