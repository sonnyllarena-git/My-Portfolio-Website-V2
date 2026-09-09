import { Fragment, useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import { ADMIN_CARD_BORDER, ADMIN_SECONDARY_TEXT } from './adminTheme.js'

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    apiFetch('/inquiries')
      .then(setInquiries)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  async function handleToggle(inquiry) {
    const opening = expandedId !== inquiry.id
    setExpandedId(opening ? inquiry.id : null)
    if (opening && !inquiry.read) {
      try {
        const updated = await apiFetch(`/inquiries/${inquiry.id}/read`, {
          method: 'PATCH',
        })
        setInquiries((prev) =>
          prev.map((i) => (i.id === updated.id ? updated : i)),
        )
      } catch {
        // Best-effort — the message still displays even if marking it read fails.
      }
    }
  }

  async function handleDelete(inquiry) {
    if (!window.confirm(`Delete the message from ${inquiry.name}?`)) return
    try {
      await apiFetch(`/inquiries/${inquiry.id}`, { method: 'DELETE' })
      setInquiries((prev) => prev.filter((i) => i.id !== inquiry.id))
    } catch (err) {
      window.alert(err.message || 'Failed to delete inquiry')
    }
  }

  const unreadCount = inquiries.filter((i) => !i.read).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Inquiries</h1>
        <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          {inquiries.length} message{inquiries.length === 1 ? '' : 's'}
          {unreadCount > 0 ? ` · ${unreadCount} unread` : ''}
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
              <th className="px-4 py-2 font-medium">From</th>
              <th className="px-4 py-2 font-medium">Subject</th>
              <th className="px-4 py-2 font-medium">Received</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-600">
                  Failed to load inquiries.
                </td>
              </tr>
            )}
            {!loading && !loadError && inquiries.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No messages yet.
                </td>
              </tr>
            )}
            {inquiries.map((inquiry) => (
              <Fragment key={inquiry.id}>
                <tr
                  onClick={() => handleToggle(inquiry)}
                  className={`cursor-pointer border-b last:border-0 ${ADMIN_CARD_BORDER} hover:bg-gray-50`}
                >
                  <td
                    className={`px-4 py-2 ${!inquiry.read ? 'font-semibold' : ''}`}
                  >
                    {!inquiry.read && (
                      <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-600" />
                    )}
                    {inquiry.name}
                    <div className={`text-xs ${ADMIN_SECONDARY_TEXT}`}>
                      {inquiry.email}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-2 ${!inquiry.read ? 'font-semibold' : ''}`}
                  >
                    {inquiry.subject}
                  </td>
                  <td className="px-4 py-2">
                    {formatTimestamp(inquiry.createdAt)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(inquiry)
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedId === inquiry.id && (
                  <tr
                    className={`border-b last:border-0 ${ADMIN_CARD_BORDER} bg-gray-50`}
                  >
                    <td colSpan={4} className="px-4 py-3 whitespace-pre-wrap">
                      {inquiry.message}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
