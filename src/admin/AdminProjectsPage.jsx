import { useState } from 'react'
import AdminProjectsListPage from './AdminProjectsListPage.jsx'
import AdminProjectCategoriesPage from './AdminProjectCategoriesPage.jsx'
import { ADMIN_CARD_BORDER, ADMIN_ACCENT_TEXT } from './adminTheme.js'

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'categories', label: 'Categories' },
]

export default function AdminProjectsPage() {
  const [tab, setTab] = useState('projects')

  return (
    <div>
      <div className={`mb-4 flex gap-4 border-b ${ADMIN_CARD_BORDER}`}>
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`-mb-px border-b-2 px-1 pb-2 text-sm font-medium ${
              tab === item.id
                ? `border-current ${ADMIN_ACCENT_TEXT}`
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === 'projects' ? (
        <AdminProjectsListPage />
      ) : (
        <AdminProjectCategoriesPage />
      )}
    </div>
  )
}
