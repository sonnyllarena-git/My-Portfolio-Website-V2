import logo from '../components/store/assets/components/sonny store logo.png'
import { useAdminSettings } from './AdminSettingsContext.jsx'
import {
  ADMIN_SIDEBAR_BG,
  ADMIN_SIDEBAR_BORDER,
  ADMIN_SIDEBAR_TEXT,
  ADMIN_SIDEBAR_ACTIVE_BG,
  ADMIN_SIDEBAR_ACTIVE_TEXT,
  ADMIN_HEADER_BORDER,
  ADMIN_PAGE_BG,
  ADMIN_ACCENT_TEXT,
  ADMIN_BODY_TEXT,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

const NAV_ITEMS = [
  { id: 'products', label: 'Products' },
  { id: 'settings', label: 'Settings' },
]

export default function AdminLayout({
  children,
  activeView,
  onNavigate,
  onLogout,
}) {
  const { accentHex } = useAdminSettings()

  return (
    <div
      className={`flex min-h-screen ${ADMIN_PAGE_BG}`}
      style={{ '--admin-accent': accentHex }}
    >
      <aside
        className={`flex w-56 shrink-0 flex-col ${ADMIN_SIDEBAR_BG} border-r ${ADMIN_SIDEBAR_BORDER}`}
      >
        <div className="flex items-center gap-2 px-4 py-4">
          <img src={logo} alt="Sonny" className="h-7 shrink-0" />
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`rounded px-3 py-2 text-left text-sm font-medium ${
                activeView === item.id
                  ? `${ADMIN_SIDEBAR_ACTIVE_BG} ${ADMIN_SIDEBAR_ACTIVE_TEXT}`
                  : ADMIN_SIDEBAR_TEXT
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header
          className={`flex h-14 items-center justify-end gap-4 border-b ${ADMIN_HEADER_BORDER} bg-white px-6`}
        >
          <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>Admin</span>
          <button
            onClick={onLogout}
            className={`text-sm ${ADMIN_ACCENT_TEXT} hover:underline`}
          >
            Log out
          </button>
        </header>
        <main className={`flex-1 p-6 ${ADMIN_BODY_TEXT}`}>{children}</main>
      </div>
    </div>
  )
}
