import { useState } from 'react'
import {
  STORE_STAR_COLOR,
  STORE_LINK_BLUE,
  STORE_SECONDARY_TEXT,
  STORE_BODY_TEXT,
} from './theme.js'
import StoreDetailsAccordion from './StoreDetailsAccordion.jsx'
import StoreSizeChartModal from './StoreSizeChartModal.jsx'

const COLOR_SWATCH_HEX = {
  'Charcoal Grey': '#36454F',
  'Navy Blue': '#000080',
  Black: '#000000',
  White: '#FFFFFF',
  'Heather Grey': '#B0B0B0',
}

function StoreProductInfo({
  product,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
}) {
  const [showSizeChart, setShowSizeChart] = useState(false)

  const styleRows = [
    { label: 'Color', value: selectedColor },
    { label: 'Neck Style', value: product.neckStyle },
    { label: 'Style Name', value: product.styleName },
    { label: 'Fit Type', value: product.fitType },
    { label: 'Pattern', value: product.pattern },
    { label: 'Theme', value: product.theme },
    { label: 'Seasons', value: product.seasons },
    { label: 'Sleeve Type', value: product.sleeveType },
    { label: 'Hemline Form', value: product.hemlineForm },
    { label: 'Occasion', value: product.occasion },
    { label: 'Sweater Form', value: product.sweaterForm },
  ]

  const itemDetailRows = [
    { label: 'Product name', value: product.name },
    { label: 'Age Range Description', value: product.ageRangeDescription },
    { label: 'Model Name', value: product.modelName },
    { label: 'Item Type Name', value: product.itemTypeName },
  ]
  if (product.rating != null && product.reviewCount != null) {
    itemDetailRows.push({
      label: 'Customer Reviews',
      value: `${product.rating} ★ (${product.reviewCount} reviews)`,
    })
  }

  return (
    <div className={`flex-1 text-sm ${STORE_BODY_TEXT}`}>
      <h1 className="text-xl font-bold">{product.title}</h1>

      <div className="mt-1 flex items-center gap-1">
        <span className={STORE_STAR_COLOR}>★ {product.rating}</span>
        <a href="#" className={STORE_LINK_BLUE}>
          ({product.reviewCount})
        </a>
      </div>
      <p className={`mt-1 text-xs ${STORE_SECONDARY_TEXT}`}>
        {product.boughtCount}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Color: {selectedColor}</h3>
        <div className="mt-2 flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              onClick={() => onSelectColor(color)}
              style={{ backgroundColor: COLOR_SWATCH_HEX[color] }}
              className={`h-7 w-7 cursor-pointer rounded-full border ${
                selectedColor === color
                  ? 'ring-2 ring-offset-1 ring-blue-500'
                  : 'border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Size: {selectedSize}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`cursor-pointer rounded border-2 px-3 py-1 ${
                selectedSize === size ? 'border-blue-600' : 'border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowSizeChart(true)}
          className={`mt-2 cursor-pointer ${STORE_LINK_BLUE}`}
        >
          Size Chart ▾
        </button>
      </div>

      <h2 className="mt-6 border-b border-gray-200 pb-2 font-semibold">
        Product details
      </h2>

      <StoreDetailsAccordion
        title="Top highlights"
        rows={[
          { label: 'Fabric type', value: product.material },
          { label: 'Care instructions', value: product.careInstructions },
        ]}
      >
        <p className="mt-3 font-semibold">About this item</p>
        <p className="mt-1 text-sm">{product.description}</p>
      </StoreDetailsAccordion>

      <StoreDetailsAccordion title="Style" rows={styleRows} />

      <StoreDetailsAccordion title="Item details" rows={itemDetailRows} />

      {showSizeChart && (
        <StoreSizeChartModal onClose={() => setShowSizeChart(false)} />
      )}
    </div>
  )
}

export default StoreProductInfo
