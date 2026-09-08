import { fetchWithTimeout } from './fetchWithTimeout.js'

export async function fetchArtworks() {
  const response = await fetchWithTimeout('/api/visitor-arts')
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitArtwork({ title, author, imageData }) {
  const response = await fetchWithTimeout('/api/visitor-arts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, imageData }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
