import { ADMIN_CARD_BORDER, ADMIN_SECONDARY_TEXT } from './adminTheme.js'

export default function AdminStatTile({ label, value, sublabel }) {
  return (
    <div
      className={`flex flex-col gap-1 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
    >
      <span className={`text-xs font-medium ${ADMIN_SECONDARY_TEXT}`}>
        {label}
      </span>
      <span className="text-2xl font-semibold">{value}</span>
      {sublabel && (
        <span className={`text-xs ${ADMIN_SECONDARY_TEXT}`}>{sublabel}</span>
      )}
    </div>
  )
}
