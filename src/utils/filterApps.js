export function filterApps(apps, query) {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return []
  return apps.filter((app) => app.label.toLowerCase().includes(trimmed))
}
