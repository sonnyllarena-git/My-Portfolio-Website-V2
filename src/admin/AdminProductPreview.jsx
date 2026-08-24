import { StoreCartProvider } from '../context/StoreCartContext.jsx'
import StoreProductDetails from '../components/store/StoreProductDetails.jsx'
import { mapCatalogProductToStoreProduct } from '../utils/mapCatalogProduct.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

export default function AdminProductPreview({
  product,
  onClose,
  onPublish,
  publishing,
}) {
  const storeProduct = mapCatalogProductToStoreProduct(product)

  return (
    <div
      className={`mb-4 overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
    >
      <div
        className={`flex items-center justify-between border-b ${ADMIN_CARD_BORDER} p-3`}
      >
        <p className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          Previewing as a customer would see it —{' '}
          {product.published
            ? 'published'
            : 'draft, not visible on the Store yet'}
        </p>
        <div className="flex gap-2">
          {!product.published && (
            <button
              type="button"
              onClick={() => onPublish(product)}
              disabled={publishing}
              className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50`}
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-1.5 text-sm`}
          >
            Close preview
          </button>
        </div>
      </div>
      <StoreCartProvider>
        <StoreProductDetails product={storeProduct} onBack={onClose} />
      </StoreCartProvider>
    </div>
  )
}
