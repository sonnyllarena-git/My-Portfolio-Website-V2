import { useEffect, useRef, useState } from 'react'
import logo from './assets/components/sonny store logo.png'
import pinIcon from './assets/icons/pin address.png'
import searchIcon from './assets/icons/search.png'
import cartIcon from './assets/icons/cart.png'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { useStoreCart } from '../../context/StoreCartContext.jsx'
import {
  STORE_HEADER_BG,
  STORE_GOLD_SEARCH_BG,
  STORE_BADGE_BG,
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
  STORE_LINK_BLUE,
} from './theme.js'

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

function StoreHeader({
  searchQuery = '',
  onSearchChange = () => {},
  onCartClick = () => {},
  userName = null,
  onSignInClick = () => {},
  onSignUpClick = () => {},
  onSignOutClick = () => {},
}) {
  const isMobile = useIsMobile()
  const { itemCount } = useStoreCart()
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const closeAccountMenuTimer = useRef(null)
  const accountMenuRef = useRef(null)

  useEffect(() => () => clearTimeout(closeAccountMenuTimer.current), [])

  useEffect(() => {
    if (!isAccountMenuOpen) return
    function handleOutsideClick(e) {
      if (!accountMenuRef.current?.contains(e.target)) {
        clearTimeout(closeAccountMenuTimer.current)
        setIsAccountMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isAccountMenuOpen])

  // The flyout sits below the trigger with a small gap — a quick diagonal mouse move through
  // that gap briefly hovers neither element, so closing has to wait a beat instead of firing
  // the instant the pointer leaves either one.
  function openAccountMenu() {
    clearTimeout(closeAccountMenuTimer.current)
    setIsAccountMenuOpen(true)
  }

  function scheduleCloseAccountMenu() {
    closeAccountMenuTimer.current = setTimeout(
      () => setIsAccountMenuOpen(false),
      1000,
    )
  }

  function handleSignInClick() {
    setIsAccountMenuOpen(false)
    onSignInClick()
  }

  function handleSignUpClick() {
    setIsAccountMenuOpen(false)
    onSignUpClick()
  }

  function handleSignOut() {
    setIsAccountMenuOpen(false)
    onSignOutClick()
  }

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
    <div
      onClick={onCartClick}
      className="flex shrink-0 cursor-pointer items-center gap-1"
    >
      <div className="relative">
        <img src={cartIcon} alt="Cart" className="h-6 w-6" />
        {itemCount > 0 && (
          <span
            className={`absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ${STORE_BADGE_BG}`}
          >
            {itemCount}
          </span>
        )}
      </div>
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
      className={`relative z-40 flex shrink-0 items-center gap-4 px-4 py-2 text-white ${STORE_HEADER_BG}`}
    >
      {isAccountMenuOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-full z-40 bg-black/50"
          style={{ height: '100vh' }}
        />
      )}

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

      {userName ? (
        <div
          ref={accountMenuRef}
          className="relative z-50 shrink-0 cursor-pointer text-sm leading-tight"
          onClick={() => setIsAccountMenuOpen((open) => !open)}
        >
          <div className="text-xs text-white/70">Hello, {userName}</div>
          <div className="font-semibold">Account</div>

          {isAccountMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-md border border-gray-200 bg-white p-1 text-black shadow-lg">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full cursor-pointer rounded px-2 py-1.5 text-left text-sm hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          ref={accountMenuRef}
          className="relative z-50 shrink-0 cursor-pointer text-sm leading-tight"
          onMouseEnter={openAccountMenu}
          onMouseLeave={scheduleCloseAccountMenu}
        >
          <div className="text-xs text-white/70">Hello, sign in</div>
          <div className="font-semibold">Sign in</div>

          {isAccountMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white p-3 text-black shadow-lg">
              <button
                type="button"
                onClick={handleSignInClick}
                className={`w-full cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors duration-150 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
              >
                Sign in
              </button>
              <div className="mt-2 text-center text-xs">
                New customer?{' '}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className={`cursor-pointer underline ${STORE_LINK_BLUE}`}
                >
                  Start here.
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="shrink-0 cursor-pointer text-sm leading-tight">
        <div className="text-xs text-white/70">Returns</div>
        <div className="font-semibold">& Orders</div>
      </div>

      {cartButton}
    </div>
  )
}

export default StoreHeader
