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
