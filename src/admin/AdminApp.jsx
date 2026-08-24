import { useState } from 'react'
import AdminLogin from './AdminLogin.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminProductsPage from './AdminProductsPage.jsx'
import AdminSettingsPage from './AdminSettingsPage.jsx'
import { AdminSettingsProvider } from './AdminSettingsContext.jsx'
import { getToken, clearToken } from './api.js'

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getToken()))
  const [view, setView] = useState('products')

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
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
