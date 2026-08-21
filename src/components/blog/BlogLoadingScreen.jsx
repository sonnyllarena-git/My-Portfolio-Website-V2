import { useEffect } from 'react'
import loadingIcon from './assets/components/loading icon.png'

const LOADING_MS = 2000
const RING_MASK =
  'radial-gradient(circle, transparent 0 27%, black 30% 40%, transparent 43% 100%)'

function BlogLoadingScreen({ onDone }) {
  useEffect(() => {
    const doneTimeout = setTimeout(onDone, LOADING_MS)
    return () => clearTimeout(doneTimeout)
  }, [onDone])

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/85"
    >
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        <img src={loadingIcon} alt="Loading" className="h-full w-full" />
        <div
          className="blog-loading-sweep absolute inset-0"
          style={{ maskImage: RING_MASK, WebkitMaskImage: RING_MASK }}
        />
      </div>
    </div>
  )
}

export default BlogLoadingScreen
