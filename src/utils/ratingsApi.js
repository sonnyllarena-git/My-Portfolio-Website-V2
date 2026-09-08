import { fetchWithTimeout } from './fetchWithTimeout.js'

export async function fetchRatings(gameId) {
  const response = await fetchWithTimeout(`/api/ratings/${gameId}`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitRatingApi(gameId, { name, rating, comment }) {
  const response = await fetchWithTimeout(`/api/ratings/${gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, rating, comment }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
