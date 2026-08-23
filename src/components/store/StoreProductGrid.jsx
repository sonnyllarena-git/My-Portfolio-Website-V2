import { storeProducts, STORE_GRID_SIZE } from './data/storeProducts.js'
import StoreProductCard from './StoreProductCard.jsx'
import StoreComingSoonCard from './StoreComingSoonCard.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'

function StoreProductGrid() {
  const isMobile = useIsMobile()
  const comingSoonCount = Math.max(0, STORE_GRID_SIZE - storeProducts.length)

  return (
    <div
      className={`grid flex-1 gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-4'}`}
    >
      {storeProducts.map((product) => (
        <StoreProductCard key={product.id} product={product} />
      ))}
      {Array.from({ length: comingSoonCount }).map((_, index) => (
        <StoreComingSoonCard key={`coming-soon-${index}`} />
      ))}
    </div>
  )
}

export default StoreProductGrid
