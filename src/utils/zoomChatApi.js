import { fetchWithTimeout } from './fetchWithTimeout.js'

// Fire-and-forget from the caller's perspective — a visitor's chat should never stall or
// break because a transcript write failed, so this only ever logs on failure.
export async function saveZoomChatMessage({
  sessionId,
  visitorName,
  visitorEmail,
  role,
  content,
}) {
  try {
    await fetchWithTimeout('/api/zoom-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        visitorName,
        visitorEmail,
        role,
        content,
      }),
    })
  } catch (err) {
    console.error('Failed to save Zoom Chat message:', err)
  }
}
