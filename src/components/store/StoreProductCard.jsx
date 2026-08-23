import {
  STORE_BADGE_BG,
  STORE_STAR_COLOR,
  STORE_LINK_BLUE,
  STORE_TITLE_LINK_BLUE,
  STORE_SECONDARY_TEXT,
  STORE_GOLD_CTA_BG,
  STORE_BODY_TEXT,
} from './theme.js'

function StoreProductCard({ product }) {
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

      <a href="#" className={`text-sm ${STORE_TITLE_LINK_BLUE} line-clamp-3`}>
        {product.title}
      </a>

      <div className={`text-sm font-semibold ${STORE_BODY_TEXT}`}>
        {product.subline}
      </div>

      <p className="line-clamp-3 text-sm text-black group-hover:line-clamp-none">
        {product.description}
      </p>

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
        className={`mt-1 rounded-full py-1.5 text-sm font-medium ${STORE_GOLD_CTA_BG}`}
      >
        Add to cart
      </button>
    </div>
  )
}

export default StoreProductCard
