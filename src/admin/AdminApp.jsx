import { useState } from 'react'
import AdminLogin from './AdminLogin.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminProductsPage from './AdminProductsPage.jsx'
import { getToken } from './api.js'

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getToken()))

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
  }

  return (
    <AdminLayout>
      <AdminProductsPage />
    </AdminLayout>
  )
}
