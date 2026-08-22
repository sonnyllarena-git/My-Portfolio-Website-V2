import { useEffect, useRef, useState } from 'react'

export function useUnmutedAutoplay() {
  const videoRef = useRef(null)
  const [needsClickToPlay, setNeedsClickToPlay] = useState(false)

  useEffect(() => {
    videoRef.current?.play().catch(() => setNeedsClickToPlay(true))
  }, [])

  function retryPlay() {
    videoRef.current?.play()
    setNeedsClickToPlay(false)
  }

  return { videoRef, needsClickToPlay, retryPlay }
}
