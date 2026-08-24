import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile.js'

const LENS_SIZE = 150
const ZOOM = 2.5

function StoreProductGallery({ images, productName }) {
  const isMobile = useIsMobile()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageContainerRef = useRef(null)
  const [lens, setLens] = useState(null)
  const activeImage = images[activeImageIndex]

  function handleMouseMove(e) {
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))
    setLens({ x, y, width: rect.width, height: rect.height })
  }

  const thumbnails = (
    <div className={`flex gap-2 ${isMobile ? 'flex-row' : 'flex-col'}`}>
      {images.map((image, index) => {
        const selectHandlers = isMobile
          ? { onClick: () => setActiveImageIndex(index) }
          : { onMouseEnter: () => setActiveImageIndex(index) }
        return (
          <button
            key={image}
            type="button"
            {...selectHandlers}
            className={`h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded border-2 ${
              activeImageIndex === index
                ? 'border-orange-500'
                : 'border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} view ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        )
      })}
    </div>
  )

  const mainImage = (
    <div
      ref={imageContainerRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : () => setLens(null)}
      className={`relative shrink-0 overflow-hidden rounded bg-white ${
        isMobile ? 'aspect-square w-full max-w-sm' : 'h-80 w-80 cursor-zoom-in'
      }`}
    >
      <AnimatePresence>
        <motion.img
          key={activeImageIndex}
          src={activeImage}
          alt={productName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {lens && (
        <div
          className="pointer-events-none absolute rounded border-2 border-white shadow-lg"
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: Math.max(
              0,
              Math.min(lens.x - LENS_SIZE / 2, lens.width - LENS_SIZE),
            ),
            top: Math.max(
              0,
              Math.min(lens.y - LENS_SIZE / 2, lens.height - LENS_SIZE),
            ),
            backgroundImage: `url(${activeImage})`,
            backgroundSize: `${lens.width * ZOOM}px ${lens.height * ZOOM}px`,
            backgroundPosition: `-${lens.x * ZOOM - LENS_SIZE / 2}px -${lens.y * ZOOM - LENS_SIZE / 2}px`,
          }}
        />
      )}
    </div>
  )

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-3">
        {mainImage}
        {thumbnails}
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {thumbnails}
      {mainImage}
    </div>
  )
}

export default StoreProductGallery
