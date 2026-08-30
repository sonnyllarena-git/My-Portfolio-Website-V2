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
} from '../admin/adminTheme.js'

const NAV_ITEMS = [
  { id: 'products', label: 'Products' },
  { id: 'resume-templates', label: 'Resume Templates' },
]

export default function GuestAdminLayout({
  children,
  activeView,
  onNavigate,
  onReset,
}) {
  return (
    <div className={`flex h-full ${ADMIN_PAGE_BG}`}>
      <aside
        className={`flex w-56 shrink-0 flex-col ${ADMIN_SIDEBAR_BG} border-r ${ADMIN_SIDEBAR_BORDER}`}
      >
        <div className="px-4 py-4 text-sm font-semibold text-white">
          Admin Demo
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
          className={`flex h-14 items-center justify-between gap-4 border-b ${ADMIN_HEADER_BORDER} bg-white px-6`}
        >
          <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
            Guest Mode — changes reset on refresh
          </span>
          <button
            onClick={onReset}
            className={`text-sm ${ADMIN_ACCENT_TEXT} hover:underline`}
          >
            Reset demo
          </button>
        </header>
        <main className={`flex-1 overflow-auto p-6 ${ADMIN_BODY_TEXT}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
