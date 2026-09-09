import { useEffect, useState } from 'react'
import AdminLogin from './AdminLogin.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminDashboardPage from './AdminDashboardPage.jsx'
import AdminInquiriesPage from './AdminInquiriesPage.jsx'
import AdminProductsPage from './AdminProductsPage.jsx'
import AdminProjectsPage from './AdminProjectsPage.jsx'
import AdminResumeTemplatesPage from './AdminResumeTemplatesPage.jsx'
import AdminMemoryWallPage from './AdminMemoryWallPage.jsx'
import AdminVisitorArtsPage from './AdminVisitorArtsPage.jsx'
import AdminMusicLabPage from './AdminMusicLabPage.jsx'
import AdminSettingsPage from './AdminSettingsPage.jsx'
import { AdminSettingsProvider } from './AdminSettingsContext.jsx'
import { clearToken, logout } from './api.js'

export default function AdminApp() {
  // Always start logged out on every visit/reload — never resume a session from a
  // leftover token, even if one is still technically valid server-side.
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [view, setView] = useState('dashboard')

  useEffect(() => {
    clearToken()
  }, [])

  useEffect(() => {
    function handleUnauthorized() {
      setSessionExpired(true)
      setLoggedIn(false)
    }
    window.addEventListener('admin:unauthorized', handleUnauthorized)
    return () =>
      window.removeEventListener('admin:unauthorized', handleUnauthorized)
  }, [])

  if (!loggedIn) {
    return (
      <AdminLogin
        notice={sessionExpired ? 'Session expired — please sign in again.' : ''}
        onLogin={() => {
          setSessionExpired(false)
          setLoggedIn(true)
        }}
      />
    )
  }

  function handleLogout() {
    logout()
    setLoggedIn(false)
  }

  return (
    <AdminSettingsProvider>
      <AdminLayout
        activeView={view}
        onNavigate={setView}
        onLogout={handleLogout}
      >
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
      </AdminLayout>
    </AdminSettingsProvider>
  )
}
