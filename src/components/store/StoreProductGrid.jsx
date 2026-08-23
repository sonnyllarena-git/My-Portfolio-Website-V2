import { storeProducts, STORE_GRID_SIZE } from './data/storeProducts.js'
import StoreProductCard from './StoreProductCard.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'

function StoreProductGrid() {
  const isMobile = useIsMobile()
  // Cycles the seeded products to fill every slot for now — Sonny will drop in more real
  // products later (see the empty `product - Copy*` folders), at which point this just works.
  const gridProducts = Array.from(
    { length: STORE_GRID_SIZE },
    (_, index) => storeProducts[index % storeProducts.length],
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
