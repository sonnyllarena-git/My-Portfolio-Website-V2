import { useState } from 'react'
import { useStoreCart } from '../../context/StoreCartContext.jsx'
import { useStoreCatalog } from '../../context/StoreCatalogContext.jsx'
import { STORE_BUYNOW_BG, STORE_BUYNOW_HOVER_BG } from './theme.js'

function StoreCheckoutPlaceOrderStep() {
  const { items } = useStoreCart()
  const { products: storeProducts } = useStoreCatalog()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const lines = items
    .map((item) => ({
      ...item,
      product: storeProducts.find((p) => p.id === item.productId),
    }))
    .filter((line) => line.product)

  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  )

  if (orderPlaced) {
    return (
      <p className="text-sm text-gray-600">
        Order placed — this is a demo, no real order was submitted.
      </p>
    )
  }

  return (
    <div>
      <div className="divide-y divide-gray-200">
        {lines.map((line) => (
          <div
            key={`${line.productId}-${line.color}-${line.size}`}
            className="flex items-center gap-3 py-3"
          >
            <img
              src={line.product.image}
              alt={line.product.name}
              className="h-12 w-12 object-contain"
            />
            <span className="flex-1 text-sm font-bold">
              {line.product.title}
            </span>
            <span className="text-sm text-gray-600">Qty: {line.quantity}</span>
            <span className="text-sm font-bold">
              PHP{' '}
              {(line.product.price * line.quantity).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-gray-200 pt-4 text-right text-sm">
        Order total:{' '}
        <span className="font-bold">
          PHP {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </p>

      <button
        type="button"
        onClick={() => setOrderPlaced(true)}
        className={`mt-4 w-full max-w-xs cursor-pointer rounded-full py-2 font-medium text-white transition-colors duration-150 ${STORE_BUYNOW_BG} ${STORE_BUYNOW_HOVER_BG}`}
      >
        Place your order
      </button>
    </div>
  )
}

export default StoreCheckoutPlaceOrderStep
