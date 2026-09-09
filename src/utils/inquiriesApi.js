import { fetchWithTimeout } from './fetchWithTimeout.js'

export async function submitInquiry({
  name,
  email,
  subject,
  message,
  website,
}) {
  const response = await fetchWithTimeout('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message, website }),
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${response.status}`)
  }
  return response.json()
}
