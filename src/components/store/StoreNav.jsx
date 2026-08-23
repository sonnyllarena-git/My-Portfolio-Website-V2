import { STORE_NAV_BG } from './theme.js'

const NAV_LINKS = [
  'Sonny Promo',
  "Today's Deals",
  'Customer Service',
  'Prime Video',
  'Gift Cards',
  'Sell',
  'Registry',
]

function StoreNav() {
  return (
    <div
      className={`flex h-10 shrink-0 items-center gap-4 overflow-x-auto px-4 text-sm text-white ${STORE_NAV_BG}`}
    >
      <button className="flex shrink-0 items-center gap-1 font-semibold">
        <span>☰</span>
        All
      </button>
      {NAV_LINKS.map((link) => (
        <button key={link} className="shrink-0 whitespace-nowrap">
          {link}
        </button>
      ))}
    </div>
  )
}

export default StoreNav
