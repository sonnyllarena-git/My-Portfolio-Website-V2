import logo from '../components/store/assets/components/sonny store logo.png'
import {
  ADMIN_SIDEBAR_BG,
  ADMIN_SIDEBAR_BORDER,
  ADMIN_PAGE_BG,
  ADMIN_ACCENT_TEXT,
  ADMIN_ACCENT_SOFT_BG,
  ADMIN_BODY_TEXT,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

export default function AdminLayout({ children }) {
  return (
    <div className={`flex min-h-screen ${ADMIN_PAGE_BG}`}>
      <aside
        className={`flex w-56 shrink-0 flex-col ${ADMIN_SIDEBAR_BG} border-r ${ADMIN_SIDEBAR_BORDER}`}
      >
        <div className="flex items-center gap-2 px-4 py-4">
          <img src={logo} alt="Sonny" className="h-7 shrink-0" />
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <span
            className={`rounded px-3 py-2 text-sm font-medium ${ADMIN_ACCENT_TEXT} ${ADMIN_ACCENT_SOFT_BG}`}
          >
            Products
          </span>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header
          className={`flex h-14 items-center justify-end border-b ${ADMIN_SIDEBAR_BORDER} bg-white px-6`}
        >
          <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>Admin</span>
        </header>
        <main className={`flex-1 p-6 ${ADMIN_BODY_TEXT}`}>{children}</main>
      </div>
    </div>
  )
}
