import { ADMIN_SECONDARY_TEXT } from './adminTheme.js'

export default function AdminBarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value))

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-xs">
          <span
            className={`w-28 shrink-0 truncate ${ADMIN_SECONDARY_TEXT}`}
            title={d.label}
          >
            {d.label}
          </span>
          <div className="h-4 flex-1 overflow-hidden rounded bg-gray-100">
            <div
              className="h-4 rounded transition-[width]"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: d.color,
              }}
            />
          </div>
          <span className="w-6 shrink-0 text-right font-medium">{d.value}</span>
        </div>
      ))}
    </div>
  )
}
