import { ADMIN_SECONDARY_TEXT } from './adminTheme.js'

function buildConicStops(data, total) {
  return data
    .filter((d) => d.value > 0)
    .reduce(
      (acc, d) => {
        const start = acc.cursor
        const end = start + (d.value / total) * 100
        acc.cursor = end
        acc.parts.push(`${d.color} ${start}% ${end}%`)
        return acc
      },
      { cursor: 0, parts: [] },
    )
    .parts.join(', ')
}

export default function AdminPieChart({ data, emptyLabel = 'No data yet' }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-32 w-32 shrink-0 rounded-full bg-gray-100" />
        <p className={`text-xs ${ADMIN_SECONDARY_TEXT}`}>{emptyLabel}</p>
      </div>
    )
  }

  const stops = buildConicStops(data, total)

  return (
    <div className="flex items-center gap-4">
      <div
        className="h-32 w-32 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      />
      <ul className="flex flex-col gap-1.5">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className={ADMIN_SECONDARY_TEXT}>{d.label}</span>
            <span className="font-medium">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
