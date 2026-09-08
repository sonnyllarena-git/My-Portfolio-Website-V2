import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import { ADMIN_SECONDARY_TEXT } from './adminTheme.js'

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminVisitorArtsPage() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    apiFetch('/visitor-arts')
      .then(setArtworks)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(artwork) {
    if (!window.confirm(`Delete "${artwork.title}" by ${artwork.author}?`))
      return
    try {
      await apiFetch(`/visitor-arts/${artwork.id}`, { method: 'DELETE' })
      setArtworks((prev) => prev.filter((a) => a.id !== artwork.id))
    } catch (err) {
      window.alert(err.message || 'Failed to delete artwork')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Visitor Arts</h1>
        <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          {artworks.length} artwork{artworks.length === 1 ? '' : 's'}
        </span>
      </div>
      {loadError && (
        <p className="text-sm text-red-600">Failed to load artworks.</p>
      )}
      {!loading && !loadError && artworks.length === 0 && (
        <p className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>No artworks yet.</p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="overflow-hidden rounded-lg border border-[#E3E3E3] bg-white"
          >
            <img
              src={artwork.imageData}
              alt={artwork.title}
              className="aspect-square w-full object-cover"
            />
            <div className="p-2">
              <div className="truncate text-xs font-medium">
                {artwork.title}
              </div>
              <div className={`truncate text-xs ${ADMIN_SECONDARY_TEXT}`}>
                {artwork.author} · {formatTimestamp(artwork.createdAt)}
              </div>
              <button
                onClick={() => handleDelete(artwork)}
                className="mt-1 text-xs text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
