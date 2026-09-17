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

function TranscriptView({ sessionId }) {
  const [messages, setMessages] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    apiFetch(`/zoom-chat/${sessionId}`)
      .then(setMessages)
      .catch(() => setLoadError(true))
  }, [sessionId])

  if (loadError) {
    return <p className="px-4 py-3 text-red-600">Failed to load transcript.</p>
  }
  if (!messages) {
    return (
      <p className={`px-4 py-3 ${ADMIN_SECONDARY_TEXT}`}>Loading transcript…</p>
    )
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
            message.role === 'guest'
              ? 'self-end bg-blue-50 text-blue-900'
              : 'self-start bg-gray-100 text-gray-800'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className={`mt-1 text-[11px] ${ADMIN_SECONDARY_TEXT}`}>
            {message.role === 'guest' ? 'Visitor' : 'Bot'} ·{' '}
            {formatTimestamp(message.createdAt)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function AdminZoomChatPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    apiFetch('/zoom-chat')
      .then(setSessions)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Zoom Chat</h1>
        <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          {sessions.length} conversation{sessions.length === 1 ? '' : 's'}
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
              <th className="px-4 py-2 font-medium">Visitor</th>
              <th className="px-4 py-2 font-medium">Started</th>
              <th className="px-4 py-2 font-medium">Last message</th>
              <th className="px-4 py-2 font-medium">Messages</th>
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-600">
                  Failed to load conversations.
                </td>
              </tr>
            )}
            {!loading && !loadError && sessions.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No conversations yet.
                </td>
              </tr>
            )}
            {sessions.map((session) => (
              <Fragment key={session.sessionId}>
                <tr
                  onClick={() =>
                    setExpandedId((prev) =>
                      prev === session.sessionId ? null : session.sessionId,
                    )
                  }
                  className={`cursor-pointer border-b last:border-0 ${ADMIN_CARD_BORDER} hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">
                    {session.visitorName || (
                      <span className={ADMIN_SECONDARY_TEXT}>
                        (left before giving a name)
                      </span>
                    )}
                    {session.visitorEmail && (
                      <div className={`text-xs ${ADMIN_SECONDARY_TEXT}`}>
                        {session.visitorEmail}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {formatTimestamp(session.startedAt)}
                  </td>
                  <td className="px-4 py-2">
                    {formatTimestamp(session.lastMessageAt)}
                  </td>
                  <td className="px-4 py-2">{session.messageCount}</td>
                </tr>
                {expandedId === session.sessionId && (
                  <tr
                    className={`border-b last:border-0 ${ADMIN_CARD_BORDER} bg-gray-50`}
                  >
                    <td colSpan={4} className="p-0">
                      <TranscriptView sessionId={session.sessionId} />
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
