export function buildContactIcons(info) {
  return [...info.fields, ...info.profiles]
    .filter((entry) => entry.kind)
    .map((entry) => ({
      id: entry.kind,
      label: entry.label,
      href: entry.url ?? entry.value,
      stat: entry.stat,
    }))
}
