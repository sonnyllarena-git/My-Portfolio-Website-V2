import { useCallback, useEffect, useRef, useState } from 'react'
import bootVideo from './assets/loading-screen-v2.mp4'
import { useUnmutedAutoplay } from './useUnmutedAutoplay.js'

const MAX_PLAYBACK_MS = 10000
const PAUSE_AT_S = 7.5

function StartupLoadingScreen({ onSignIn }) {
  const { videoRef, needsClickToPlay, retryPlay } = useUnmutedAutoplay()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPausedForClick, setIsPausedForClick] = useState(false)
  const hasPausedAtMarkerRef = useRef(false)
  const hasFinishedRef = useRef(false)

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    onSignIn()
  }, [onSignIn])

  useEffect(() => {
    if (!isPlaying) return
    const safetyTimeout = setTimeout(finish, MAX_PLAYBACK_MS)
    return () => clearTimeout(safetyTimeout)
  }, [isPlaying, finish])

  function handleScreenClick(e) {
    e.stopPropagation()
    if (needsClickToPlay) retryPlay()
  }

  function handleResumeClick(e) {
    e.stopPropagation()
    videoRef.current?.play()
    setIsPausedForClick(false)
  }

  function handleTimeUpdate(e) {
    if (hasPausedAtMarkerRef.current) return
    if (e.target.currentTime < PAUSE_AT_S) return
    hasPausedAtMarkerRef.current = true
    e.target.pause()
    setIsPausedForClick(true)
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
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={finish}
          onError={finish}
        />
        {needsClickToPlay && (
          <p className="absolute inset-x-0 bottom-[8%] text-center text-sm text-white/70">
            Click anywhere to start
          </p>
        )}
        {isPausedForClick && (
          <button
            type="button"
            onClick={handleResumeClick}
            aria-label="Sign in"
            className="absolute top-[57.5%] left-[45.5%] h-[4%] w-[9%] cursor-pointer rounded-md transition-shadow duration-200 hover:shadow-[0_0_14px_rgba(64,120,255,0.4)]"
          />
        )}
      </div>
    </div>
  )
}

export default StartupLoadingScreen
