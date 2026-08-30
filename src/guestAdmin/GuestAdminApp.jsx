import { useState } from 'react'
import GuestAdminLayout from './GuestAdminLayout.jsx'
import GuestAdminProductsPage from './GuestAdminProductsPage.jsx'
import GuestAdminResumeTemplatesPage from './GuestAdminResumeTemplatesPage.jsx'

export default function GuestAdminApp() {
  const [view, setView] = useState('products')
  const [resetKey, setResetKey] = useState(0)

  return (
    <GuestAdminLayout
      activeView={view}
      onNavigate={setView}
      onReset={() => setResetKey((key) => key + 1)}
    >
      {view === 'products' ? (
        <GuestAdminProductsPage key={`products-${resetKey}`} />
      ) : (
        <GuestAdminResumeTemplatesPage key={`templates-${resetKey}`} />
      )}
    </GuestAdminLayout>
  )
}
