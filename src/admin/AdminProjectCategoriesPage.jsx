import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
} from './adminTheme.js'

export default function AdminProjectCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    apiFetch('/project-categories')
      .then(setCategories)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(event) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || submitting) return
    setError('')
    setSubmitting(true)
    try {
      const created = await apiFetch('/project-categories', {
        method: 'POST',
        body: JSON.stringify({ name: trimmed }),
      })
      setCategories((prev) => [...prev, created])
      setName('')
    } catch (err) {
      setError(err.message || 'Failed to add category')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(category) {
    if (!window.confirm(`Delete category "${category.name}"?`)) return
    try {
      await apiFetch(`/project-categories/${category.id}`, {
        method: 'DELETE',
      })
      setCategories((prev) => prev.filter((c) => c.id !== category.id))
    } catch (err) {
      window.alert(err.message || 'Failed to delete category')
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Categories</h1>
      <form
        onSubmit={handleAdd}
        className={`mb-4 flex items-start gap-2 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
      >
        <div className="flex flex-1 flex-col gap-1">
          <input
            type="text"
            placeholder="New category name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white disabled:opacity-50`}
        >
          {submitting ? 'Adding…' : 'Add category'}
        </button>
      </form>
      <div
        className={`overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
            >
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-red-600">
                  Failed to load categories.
                </td>
              </tr>
            )}
            {!loading && !loadError && categories.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No categories yet.
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <tr
                key={category.id}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
