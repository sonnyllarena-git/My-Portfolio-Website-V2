import { STORE_GRID_SIZE } from './data/storeProducts.js'
import StoreProductCard from './StoreProductCard.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'

function StoreProductGrid({ products }) {
  const isMobile = useIsMobile()

  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500">
        No products match your search.
      </div>
    )
  }

  // Cycles the matched products to fill every slot for now — Sonny will drop in more real
  // products later (see the empty `product - Copy*` folders), at which point this just works.
  const gridProducts = Array.from(
    { length: STORE_GRID_SIZE },
    (_, index) => products[index % products.length],
  )

  return (
    <div
      className={`grid flex-1 gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-4'}`}
    >
      {gridProducts.map((product, index) => (
        <StoreProductCard key={`${product.id}-${index}`} product={product} />
      ))}
    </div>
  )
}

export default StoreProductGrid
