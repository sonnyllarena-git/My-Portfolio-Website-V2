export function addRecentAppId(currentIds, id, maxLength = 6) {
  const deduped = currentIds.filter((existing) => existing !== id)
  return [id, ...deduped].slice(0, maxLength)
}
