import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import { ADMIN_CARD_BORDER, ADMIN_SECONDARY_TEXT } from './adminTheme.js'

function StarDisplay({ rating }) {
  return (
    <span className="text-sm text-yellow-500">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminMemoryWallPage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    apiFetch('/memory-wall')
      .then(setNotes)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(note) {
    if (!window.confirm(`Delete this note from ${note.name}?`)) return
    try {
      await apiFetch(`/memory-wall/${note.id}`, { method: 'DELETE' })
      setNotes((prev) => prev.filter((n) => n.id !== note.id))
    } catch (err) {
      window.alert(err.message || 'Failed to delete note')
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Memory Wall</h1>
        <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          {notes.length} note{notes.length === 1 ? '' : 's'}
        </span>
      </div>
      <div
        className={`overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
            >
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Message</th>
              <th className="px-4 py-2 font-medium">Rating</th>
              <th className="px-4 py-2 font-medium">Posted</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                  Failed to load notes.
                </td>
              </tr>
            )}
            {!loading && !loadError && notes.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No notes yet.
                </td>
              </tr>
            )}
            {notes.map((note) => (
              <tr
                key={note.id}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2">{note.name}</td>
                <td className="max-w-md truncate px-4 py-2">{note.message}</td>
                <td className="px-4 py-2">
                  <StarDisplay rating={note.rating} />
                </td>
                <td className="px-4 py-2">{formatTimestamp(note.createdAt)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(note)}
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
