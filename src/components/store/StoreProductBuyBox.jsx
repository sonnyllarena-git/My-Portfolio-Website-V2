import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { useStoreCart } from '../../context/StoreCartContext.jsx'
import {
  STORE_LINK_BLUE,
  STORE_BODY_TEXT,
  STORE_INSTOCK_GREEN,
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
  STORE_BUYNOW_BG,
  STORE_BUYNOW_HOVER_BG,
} from './theme.js'

function StoreProductBuyBox({ product, selectedColor, selectedSize }) {
  const isMobile = useIsMobile()
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useStoreCart()

  return (
    <div
      className={`shrink-0 text-sm ${isMobile ? 'w-full' : 'w-72'} ${STORE_BODY_TEXT}`}
    >
      <div className="rounded-lg border border-gray-200 p-3">
        <div className="text-2xl font-bold">
          PHP{' '}
          {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>

        <p className="mt-2 text-xs text-gray-600">{product.deliveryEstimate}</p>
        <p className={`mt-2 font-semibold ${STORE_INSTOCK_GREEN}`}>In Stock</p>

        <label className="mt-3 flex items-center gap-2">
          Quantity:
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={() =>
            addItem(product.id, selectedColor, selectedSize, quantity)
          }
          className={`mt-3 w-full cursor-pointer rounded-full py-1.5 font-medium transition-colors duration-150 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
        >
          Add to cart
        </button>
        <button
          type="button"
          className={`mt-2 w-full cursor-pointer rounded-full py-1.5 font-medium text-white transition-colors duration-150 ${STORE_BUYNOW_BG} ${STORE_BUYNOW_HOVER_BG}`}
        >
          Buy Now
        </button>

        <div className="mt-4 space-y-1 border-t border-gray-200 pt-3 text-xs">
          <p>
            <span className="text-gray-500">Ships from </span>Sonny's Store
          </p>
          <p>
            <span className="text-gray-500">Sold by </span>Sonny's Store
          </p>
          <p>
            <span className="text-gray-500">Returns </span>
            <a href="#" className={STORE_LINK_BLUE}>
              30-day refund/replacement
            </a>
          </p>
          <p>
            <span className="text-gray-500">Payment </span>
            <a href="#" className={STORE_LINK_BLUE}>
              Secure transaction
            </a>
          </p>
          <p>
            <span className="text-gray-500">Gift options </span>
            <a href="#" className={STORE_LINK_BLUE}>
              Available at checkout
            </a>
          </p>
        </div>

        <button
          type="button"
          className="mt-3 w-full cursor-pointer rounded-full border border-gray-400 py-1.5 text-sm font-medium hover:bg-gray-50"
        >
          Add to List
        </button>
      </div>
    </div>
  )
}

export default StoreProductBuyBox
