import { useEffect, useState } from 'react'
import AdminLogin from './AdminLogin.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminProductsPage from './AdminProductsPage.jsx'
import AdminSettingsPage from './AdminSettingsPage.jsx'
import { AdminSettingsProvider } from './AdminSettingsContext.jsx'
import { getToken, clearToken } from './api.js'

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getToken()))
  const [sessionExpired, setSessionExpired] = useState(false)
  const [view, setView] = useState('products')

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
    clearToken()
    setLoggedIn(false)
  }

  return (
    <AdminSettingsProvider>
      <AdminLayout
        activeView={view}
        onNavigate={setView}
        onLogout={handleLogout}
      >
        {view === 'products' ? <AdminProductsPage /> : <AdminSettingsPage />}
      </AdminLayout>
    </AdminSettingsProvider>
  )
}
