import { useEffect, useState } from 'react'
import bootVideo from './assets/loading-screen-v2.mp4'
import { useUnmutedAutoplay } from './useUnmutedAutoplay.js'

const MAX_PLAYBACK_MS = 10000

function StartupLoadingScreen({ onSignIn }) {
  const { videoRef, needsClickToPlay, retryPlay } = useUnmutedAutoplay()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)

  useEffect(() => {
    if (!isPlaying || hasEnded) return
    const safetyTimeout = setTimeout(() => setHasEnded(true), MAX_PLAYBACK_MS)
    return () => clearTimeout(safetyTimeout)
  }, [isPlaying, hasEnded])

  function handleScreenClick(e) {
    e.stopPropagation()
    if (needsClickToPlay) retryPlay()
  }

  return (
    <div
      onClick={handleScreenClick}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        className="relative"
        style={{
          aspectRatio: '16 / 9',
          width: 'min(100vw, calc(100vh * 16 / 9))',
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          src={bootVideo}
          autoPlay
          playsInline
          onPlay={() => setIsPlaying(true)}
          onEnded={() => setHasEnded(true)}
          onError={() => setHasEnded(true)}
        />
        {hasEnded && (
          <button
            type="button"
            onClick={onSignIn}
            aria-label="Sign in"
            className="absolute top-[57.5%] left-[44%] h-[5.5%] w-[12%] cursor-pointer rounded-md"
          />
        )}
        {needsClickToPlay && !hasEnded && (
          <p className="absolute inset-x-0 bottom-10 text-center text-sm text-white/70 [text-shadow:0_0_6px_rgba(0,0,0,0.9)]">
            Click anywhere to continue
          </p>
        )}
      </div>
    </div>
  )
}

export default StartupLoadingScreen
