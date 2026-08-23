import { useEffect, useRef, useState } from 'react'
import {
  STORE_BADGE_BG,
  STORE_STAR_COLOR,
  STORE_LINK_BLUE,
  STORE_SECONDARY_TEXT,
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
} from './theme.js'

function StoreProductCard({ product }) {
  const descriptionRef = useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)

  useEffect(() => {
    const el = descriptionRef.current
    if (el) setIsTruncated(el.scrollHeight > el.clientHeight)
  }, [product.description])

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
          className="aspect-square w-full cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      <a
        href="#"
        className="line-clamp-3 cursor-pointer text-base font-bold text-black hover:text-orange-500"
      >
        {product.title}
      </a>

      <div>
        <p ref={descriptionRef} className="line-clamp-3 text-sm text-black">
          {product.description}
        </p>
        {isTruncated && (
          <span
            className={`cursor-pointer text-sm ${STORE_LINK_BLUE}`}
            onMouseEnter={() => setShowDescriptionModal(true)}
            onMouseLeave={() => setShowDescriptionModal(false)}
          >
            See more
          </span>
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

      <a href="#" className={`text-sm ${STORE_LINK_BLUE}`}>
        Click to see price
      </a>

      <div className={`text-xs ${STORE_SECONDARY_TEXT}`}>
        {product.deliveryEstimate}
      </div>

      <button
        className={`mt-1 cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors duration-150 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
      >
        Add to cart
      </button>

      {showDescriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-bold text-black">
              {product.title}
            </h3>
            <p className="text-sm text-black">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreProductCard
