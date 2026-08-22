import { useEffect, useState } from 'react'
import signingInVideo from './assets/loading-screen-2.mp4'
import { useUnmutedAutoplay } from './useUnmutedAutoplay.js'

const MAX_PLAYBACK_MS = 6000

function SigningInScreen({ onDone }) {
  const { videoRef, needsClickToPlay, retryPlay } = useUnmutedAutoplay()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const safetyTimeout = setTimeout(onDone, MAX_PLAYBACK_MS)
    return () => clearTimeout(safetyTimeout)
  }, [isPlaying, onDone])

  function handleClick(e) {
    e.stopPropagation()
    if (needsClickToPlay) retryPlay()
  }

  return (
    <div
      onClick={handleClick}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <video
        ref={videoRef}
        className="object-contain"
        style={{
          aspectRatio: '16 / 9',
          width: 'min(100vw, calc(100vh * 16 / 9))',
        }}
        src={signingInVideo}
        autoPlay
        playsInline
        onPlay={() => setIsPlaying(true)}
        onEnded={onDone}
        onError={onDone}
      />
      {needsClickToPlay && (
        <p className="absolute inset-x-0 bottom-10 text-center text-sm text-white/70 [text-shadow:0_0_6px_rgba(0,0,0,0.9)]">
          Click anywhere to continue
        </p>
      )}
    </div>
  )
}

export default SigningInScreen
