export async function fetchMemoryWallNotes() {
  const response = await fetch('/api/memory-wall')
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitMemoryWallNote({ name, message, rating }) {
  const response = await fetch('/api/memory-wall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message, rating }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
