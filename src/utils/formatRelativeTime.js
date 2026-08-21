const MINUTE = 60000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30 * DAY
const YEAR = 365 * DAY

export function formatRelativeTime(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  if (diffMs < MINUTE) return 'Just now'
  if (diffMs < HOUR) return `${Math.floor(diffMs / MINUTE)}m`
  if (diffMs < DAY) return `${Math.floor(diffMs / HOUR)}h`
  if (diffMs < MONTH) return `${Math.floor(diffMs / DAY)}d`
  if (diffMs < YEAR) return `${Math.floor(diffMs / MONTH)}mo`
  return `${Math.floor(diffMs / YEAR)}y`
}
