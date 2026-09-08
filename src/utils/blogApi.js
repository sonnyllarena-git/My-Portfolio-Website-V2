import { fetchWithTimeout } from './fetchWithTimeout.js'

export async function fetchInteractions() {
  const response = await fetchWithTimeout('/api/blog/interactions')
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function fetchActivity() {
  const response = await fetchWithTimeout('/api/blog/activity')
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitLike(postId, { name, avatarColor }) {
  const response = await fetchWithTimeout(`/api/blog/likes/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatarColor }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitComment(postId, { name, avatarColor, text }) {
  const response = await fetchWithTimeout(`/api/blog/comments/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatarColor, text }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitActivity({ type, name, avatarColor }) {
  const response = await fetchWithTimeout('/api/blog/activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, name, avatarColor }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
