import { useIsMobile } from '../../hooks/useIsMobile.js'
import { STORE_FOOTER_BG } from './theme.js'

const FOOTER_COLUMNS = [
  {
    title: 'Get to Know Us',
    links: ['About Sonny', 'Careers', 'Press Releases'],
  },
  {
    title: 'Make Money with Us',
    links: ['Sell products', 'Become an Affiliate', 'Advertise Your Products'],
  },
  {
    title: 'Payment Products',
    links: ['Business Card', 'Shop with Points', 'Reload Your Balance'],
  },
  {
    title: 'Let Us Help You',
    links: ['Your Account', 'Returns Centre', 'Help'],
  },
]

function StoreFooter() {
  const isMobile = useIsMobile()

  return (
    <div
      className={`grid gap-4 px-6 py-6 text-white ${isMobile ? 'grid-cols-1' : 'grid-cols-4'} ${STORE_FOOTER_BG}`}
    >
      {FOOTER_COLUMNS.map((column) => (
        <div key={column.title}>
          <h4 className="mb-2 text-sm font-semibold">{column.title}</h4>
          <ul className="space-y-1 text-sm text-white/80">
            {column.links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default StoreFooter
