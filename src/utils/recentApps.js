export const DEFAULT_RECENT_APP_IDS = [
  'resume',
  'projects',
  'blog',
  'store',
  'games',
  'terminal',
]

export function addRecentAppId(currentIds, id, maxLength = 6) {
  const deduped = currentIds.filter((existing) => existing !== id)
  return [id, ...deduped].slice(0, maxLength)
}
