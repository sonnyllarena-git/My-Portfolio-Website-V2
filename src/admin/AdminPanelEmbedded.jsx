import { useEffect, useState } from 'react'
import logo from '../components/store/assets/components/sonny store logo.png'
import AdminDashboardPage from './AdminDashboardPage.jsx'
import AdminInquiriesPage from './AdminInquiriesPage.jsx'
import AdminProductsPage from './AdminProductsPage.jsx'
import AdminProjectsPage from './AdminProjectsPage.jsx'
import AdminResumeTemplatesPage from './AdminResumeTemplatesPage.jsx'
import AdminMemoryWallPage from './AdminMemoryWallPage.jsx'
import AdminVisitorArtsPage from './AdminVisitorArtsPage.jsx'
import AdminMusicLabPage from './AdminMusicLabPage.jsx'
import AdminSettingsPage from './AdminSettingsPage.jsx'
import {
  AdminSettingsProvider,
  useAdminSettings,
} from './AdminSettingsContext.jsx'
import { logout } from './api.js'
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

// Reached only via the hidden `/admin` Terminal command (see TerminalApp.jsx) — no desktop
// icon, Start Menu, or Search entry points here. Same real admin login/data as yoursite.com/admin,
// just rendered inside a desktop Window instead of a full page (h-full, not min-h-screen).
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'memory-wall', label: 'Memory Wall' },
  { id: 'visitor-arts', label: 'Visitor Arts' },
  { id: 'music-lab', label: 'Music Lab' },
  { id: 'products', label: 'Products' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume-templates', label: 'Resume Templates' },
  { id: 'settings', label: 'Settings' },
]

function AdminPanelShell({ onClose }) {
  const [view, setView] = useState('dashboard')
  const { accentHex } = useAdminSettings()

  useEffect(() => {
    window.addEventListener('admin:unauthorized', onClose)
    return () => window.removeEventListener('admin:unauthorized', onClose)
  }, [onClose])

  function handleLogout() {
    logout()
    onClose()
  }

  return (
    <div
      className={`flex h-full ${ADMIN_PAGE_BG}`}
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
              onClick={() => setView(item.id)}
              className={`rounded px-3 py-2 text-left text-sm font-medium ${
                view === item.id
                  ? `${ADMIN_SIDEBAR_ACTIVE_BG} ${ADMIN_SIDEBAR_ACTIVE_TEXT}`
                  : ADMIN_SIDEBAR_TEXT
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header
          className={`flex h-14 shrink-0 items-center justify-end gap-4 border-b ${ADMIN_HEADER_BORDER} bg-white px-6`}
        >
          <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>Admin</span>
          <button
            onClick={handleLogout}
            className={`text-sm ${ADMIN_ACCENT_TEXT} hover:underline`}
          >
            Log out
          </button>
        </header>
        <main className={`flex-1 overflow-y-auto p-6 ${ADMIN_BODY_TEXT}`}>
          {view === 'dashboard' ? (
            <AdminDashboardPage />
          ) : view === 'inquiries' ? (
            <AdminInquiriesPage />
          ) : view === 'products' ? (
            <AdminProductsPage />
          ) : view === 'projects' ? (
            <AdminProjectsPage />
          ) : view === 'resume-templates' ? (
            <AdminResumeTemplatesPage />
          ) : view === 'memory-wall' ? (
            <AdminMemoryWallPage />
          ) : view === 'visitor-arts' ? (
            <AdminVisitorArtsPage />
          ) : view === 'music-lab' ? (
            <AdminMusicLabPage />
          ) : (
            <AdminSettingsPage />
          )}
        </main>
      </div>
    </div>
  )
}

export default function AdminPanelEmbedded({ onClose }) {
  return (
    <AdminSettingsProvider>
      <AdminPanelShell onClose={onClose} />
    </AdminSettingsProvider>
  )
}
