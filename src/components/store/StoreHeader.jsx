import logo from './assets/components/sonny store logo.png'
import pinIcon from './assets/icons/pin address.png'
import searchIcon from './assets/icons/search.png'
import cartIcon from './assets/icons/cart.png'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { STORE_HEADER_BG, STORE_GOLD_SEARCH_BG } from './theme.js'

// Countries beyond the US will become a real selector later — flag only, for now.
function UsFlagIcon() {
  return (
    <svg viewBox="0 0 20 14" className="h-4 w-5 shrink-0" aria-hidden="true">
      <rect width="20" height="14" fill="#B22234" />
      <rect y="2" width="20" height="2" fill="#fff" />
      <rect y="6" width="20" height="2" fill="#fff" />
      <rect y="10" width="20" height="2" fill="#fff" />
      <rect width="8" height="8" fill="#3C3B6E" />
    </svg>
  )
}

function StoreHeader({ searchQuery = '', onSearchChange = () => {} }) {
  const isMobile = useIsMobile()

  const searchBar = (
    <div className="flex min-w-0 flex-1 items-stretch">
      <div className="flex h-12 w-[90%] items-stretch overflow-hidden rounded">
        <button className="flex shrink-0 items-center gap-1 bg-gray-200 px-2 text-sm text-black">
          All
          <span className="text-xs">▾</span>
        </button>
        <input
          type="text"
          placeholder="Search Sonny's Store"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-w-0 flex-1 bg-white px-3 text-sm text-black outline-none"
        />
        <button
          aria-label="Search"
          className={`flex shrink-0 items-center justify-center px-3 ${STORE_GOLD_SEARCH_BG}`}
        >
          <img src={searchIcon} alt="" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  const cartButton = (
    <div className="flex shrink-0 cursor-pointer items-center gap-1">
      <img src={cartIcon} alt="Cart" className="h-6 w-6" />
      <span className="text-sm font-semibold">Cart</span>
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={`flex shrink-0 flex-col gap-2 px-3 py-2 text-white ${STORE_HEADER_BG}`}
      >
        <div className="flex items-center justify-between gap-3">
          <img src={logo} alt="Sonny" className="h-6 shrink-0" />
          {cartButton}
        </div>
        {searchBar}
      </div>
    )
  }

  return (
    <div
      className={`flex shrink-0 items-center gap-4 px-4 py-2 text-white ${STORE_HEADER_BG}`}
    >
      <img src={logo} alt="Sonny" className="h-8 shrink-0" />

      <div className="flex shrink-0 cursor-pointer items-center gap-1 text-sm">
        <img src={pinIcon} alt="" className="h-5 w-5" />
        <div className="leading-tight">
          <div className="text-xs text-white/70">Deliver to</div>
          <div className="font-semibold">Philippines</div>
        </div>
      </div>

      {searchBar}

      <div className="flex shrink-0 cursor-pointer items-center gap-1 text-sm">
        <UsFlagIcon />
        <span>EN</span>
        <span className="text-xs">▾</span>
      </div>

      <div className="shrink-0 cursor-pointer text-sm leading-tight">
        <div className="text-xs text-white/70">Hello, sign in</div>
        <div className="font-semibold">Sign in</div>
      </div>

      <div className="shrink-0 cursor-pointer text-sm leading-tight">
        <div className="text-xs text-white/70">Returns</div>
        <div className="font-semibold">& Orders</div>
      </div>

      {cartButton}
    </div>
  )
}

export default StoreHeader
