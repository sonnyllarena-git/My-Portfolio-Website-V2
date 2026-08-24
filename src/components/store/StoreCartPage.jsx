import { useStoreCart } from '../../context/StoreCartContext.jsx'
import { useStoreCatalog } from '../../context/StoreCatalogContext.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import {
  STORE_LINK_BLUE,
  STORE_BODY_TEXT,
  STORE_SECONDARY_TEXT,
  STORE_INSTOCK_GREEN,
  STORE_PAGE_BG,
  STORE_BUYNOW_BG,
  STORE_BUYNOW_HOVER_BG,
} from './theme.js'

function StoreCartPage({ onBack, onSelectProduct, onCheckout }) {
  const isMobile = useIsMobile()
  const { items, updateQuantity, removeItem } = useStoreCart()
  const { products: storeProducts } = useStoreCatalog()

  const lines = items
    .map((item) => ({
      ...item,
      product: storeProducts.find((p) => p.id === item.productId),
    }))
    .filter((line) => line.product)

  const subtotalCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  )

  return (
    <div className={`shrink-0 flex-1 p-4 ${STORE_PAGE_BG} ${STORE_BODY_TEXT}`}>
      <button
        type="button"
        onClick={onBack}
        className={`cursor-pointer text-sm ${STORE_LINK_BLUE}`}
      >
        ← Back to shopping
      </button>

      <div className="mx-auto mt-3 max-w-5xl rounded-lg bg-white p-6 shadow-sm">
        <h1 className="border-b border-gray-200 pb-3 text-2xl">
          Shopping Cart
        </h1>

        {lines.length === 0 ? (
          <p className="mt-6 text-sm text-gray-600">
            Your Sonny's Store Cart is empty.{' '}
            <button
              type="button"
              onClick={onBack}
              className={`cursor-pointer ${STORE_LINK_BLUE}`}
            >
              Continue shopping
            </button>
          </p>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {lines.map((line) => (
                <div
                  key={`${line.productId}-${line.color}-${line.size}`}
                  className={`flex gap-4 py-6 ${isMobile ? 'flex-col' : ''}`}
                >
                  <div className="flex h-96 w-96 max-w-full shrink-0 items-center justify-center">
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(line.productId)}
                        className="cursor-pointer text-left text-base font-bold hover:text-orange-500"
                      >
                        {line.product.title}
                      </button>
                      <span className="shrink-0 font-bold">
                        PHP{' '}
                        {(line.product.price * line.quantity).toLocaleString(
                          'en-US',
                          { minimumFractionDigits: 2 },
                        )}
                      </span>
                    </div>
                    <p className={`mt-1 font-semibold ${STORE_INSTOCK_GREEN}`}>
                      In Stock
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold">Color: </span>
                      {line.color}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Size: </span>
                      {line.size}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-gray-300">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              line.productId,
                              line.color,
                              line.size,
                              Math.max(1, line.quantity - 1),
                            )
                          }
                          className="cursor-pointer px-3 py-1"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(
                              line.productId,
                              line.color,
                              line.size,
                              line.quantity + 1,
                            )
                          }
                          className="cursor-pointer px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(line.productId, line.color, line.size)
                        }
                        className={`cursor-pointer text-sm ${STORE_LINK_BLUE}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end gap-3 border-t border-gray-200 pt-4">
              <p className={`text-lg ${STORE_SECONDARY_TEXT}`}>
                Subtotal ({subtotalCount} item{subtotalCount === 1 ? '' : 's'}
                ):{' '}
                <span className="font-bold text-black">
                  PHP{' '}
                  {subtotal.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </p>
              <button
                type="button"
                onClick={onCheckout}
                className={`w-full max-w-xs cursor-pointer rounded-full py-2 font-medium text-white transition-colors duration-150 ${STORE_BUYNOW_BG} ${STORE_BUYNOW_HOVER_BG}`}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StoreCartPage
