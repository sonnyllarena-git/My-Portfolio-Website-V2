export async function fetchArtworks() {
  const response = await fetch('/api/visitor-arts')
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitArtwork({ title, author, imageData }) {
  const response = await fetch('/api/visitor-arts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, imageData }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
