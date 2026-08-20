import { gameRatingSeeds } from '../data/gameRatingSeeds.js'

const KEY_PREFIX = 'arcade:ratings:'

export function readRatings(gameId) {
  const key = KEY_PREFIX + gameId
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      const seeded = gameRatingSeeds[gameId] ?? []
      localStorage.setItem(key, JSON.stringify(seeded))
      return seeded
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return gameRatingSeeds[gameId] ?? []
  }
}

export function addRating(gameId, { name, rating, comment }) {
  const current = readRatings(gameId)
  const entry = {
    id: `rating-${gameId}-${Date.now()}-${current.length}`,
    name,
    rating,
    comment,
    timestamp: new Date().toISOString(),
  }
  const updated = [...current, entry]
  localStorage.setItem(KEY_PREFIX + gameId, JSON.stringify(updated))
  return updated
}

export function getAverageRating(ratings) {
  if (!ratings.length) {
    return { average: null, count: 0 }
  }
  const total = ratings.reduce((sum, r) => sum + r.rating, 0)
  return {
    average: Math.round((total / ratings.length) * 10) / 10,
    count: ratings.length,
  }
}
