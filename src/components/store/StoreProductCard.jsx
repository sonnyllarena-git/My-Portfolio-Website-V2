import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { useStoreCart } from '../../context/StoreCartContext.jsx'
import {
  STORE_BADGE_BG,
  STORE_STAR_COLOR,
  STORE_LINK_BLUE,
  STORE_SECONDARY_TEXT,
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
} from './theme.js'

function StoreProductCard({ product, onSelect }) {
  const isMobile = useIsMobile()
  const descriptionRef = useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const { addItem } = useStoreCart()

  useEffect(() => {
    const el = descriptionRef.current
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight)
  }, [product.description])

  // Touch has no real hover, so mobile opens/closes the modal on tap instead — the modal itself
  // stays pointer-events-none on desktop (even the inner box) so it can never sit on top of the
  // "See more" trigger and steal its hover state, which was causing the open/close flicker.
  const seeMoreHandlers = isMobile
    ? { onClick: () => setShowDescriptionModal(true) }
    : {
        onMouseEnter: () => setShowDescriptionModal(true),
        onMouseLeave: () => setShowDescriptionModal(false),
      }

  return (
    <div className="group flex flex-col gap-2 bg-white p-3 transition-shadow duration-200 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <span
          className={`absolute left-0 top-0 px-2 py-0.5 text-xs font-semibold text-white ${STORE_BADGE_BG}`}
        >
          {product.badge}
        </span>
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onSelect(product.id)}
          className="aspect-square w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onSelect(product.id)
        }}
        className="line-clamp-3 cursor-pointer text-base font-bold text-black hover:text-orange-500"
      >
        {product.title}
      </a>

      <div className="relative">
        <p ref={descriptionRef} className="line-clamp-3 text-sm text-black">
          {product.description}
        </p>
        {isTruncated && (
          <span
            className={`-mx-2 -my-1 inline-block cursor-pointer rounded px-2 py-1 text-sm ${STORE_LINK_BLUE}`}
            {...seeMoreHandlers}
          >
            See more
          </span>
        )}

        {showDescriptionModal && (
          <div
            className={`pointer-events-none absolute left-0 right-0 top-0 z-20 rounded-lg border border-gray-200 bg-white p-3 shadow-lg ${isMobile ? 'pointer-events-auto' : ''}`}
          >
            {isMobile && (
              <div className="mb-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowDescriptionModal(false)}
                  aria-label="Close"
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-base text-black hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            )}
            <p className="text-sm text-black">{product.description}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm">
        <span className={STORE_STAR_COLOR}>★ {product.rating}</span>
        <a href="#" className={STORE_LINK_BLUE}>
          ({product.reviewCount})
        </a>
      </div>

      <div className={`text-xs ${STORE_SECONDARY_TEXT}`}>
        {product.boughtCount}
      </div>

      <div className="text-lg font-bold text-black">
        PHP{' '}
        {product.price.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}
      </div>

      <div className={`text-xs ${STORE_SECONDARY_TEXT}`}>
        {product.deliveryEstimate}
      </div>

      <button
        type="button"
        onClick={() =>
          addItem(product.id, product.colors[0], product.sizes[2], 1)
        }
        className={`mt-1 cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors duration-150 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
      >
        Add to cart
      </button>
    </div>
  )
}

export default StoreProductCard
