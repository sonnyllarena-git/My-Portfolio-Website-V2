import { useState } from 'react'
import StoreProductGallery from './StoreProductGallery.jsx'
import StoreProductInfo from './StoreProductInfo.jsx'
import StoreProductBuyBox from './StoreProductBuyBox.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { STORE_LINK_BLUE } from './theme.js'

function StoreProductDetails({ product, onBack }) {
  const isMobile = useIsMobile()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const gallery = (
    <StoreProductGallery images={product.images} productName={product.name} />
  )
  const info = (
    <StoreProductInfo
      product={product}
      selectedColor={selectedColor}
      onSelectColor={setSelectedColor}
      selectedSize={selectedSize}
      onSelectSize={setSelectedSize}
    />
  )
  const buyBox = (
    <StoreProductBuyBox
      product={product}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
    />
  )

  return (
    <div className="shrink-0 flex-1 bg-white p-4">
      <button
        type="button"
        onClick={onBack}
        className={`cursor-pointer text-sm ${STORE_LINK_BLUE}`}
      >
        ← Back to results
      </button>

      {isMobile ? (
        <div className="mt-3 flex flex-col gap-6">
          {gallery}
          {info}
          {buyBox}
        </div>
      ) : (
        <div className="mt-3 mx-40 flex gap-6">
          <div className="sticky top-4 self-start">{gallery}</div>
          <div className="flex flex-1 gap-6">
            {info}
            {buyBox}
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreProductDetails
