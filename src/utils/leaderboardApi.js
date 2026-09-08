export async function fetchLeaderboard(gameId) {
  const response = await fetch(`/api/leaderboard/${gameId}`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export async function submitLeaderboardScore(gameId, { name, score, label }) {
  const response = await fetch(`/api/leaderboard/${gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score, label }),
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
