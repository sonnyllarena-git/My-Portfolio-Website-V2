import { accentColors } from '../data/accentColors.js'
import { useAdminSettings } from './AdminSettingsContext.jsx'

export default function AdminSettingsPage() {
  const { accentColorId, setAccentColorId } = useAdminSettings()

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Settings</h1>
      <h2 className="mb-2 text-sm font-semibold">Accent color</h2>
      <div className="flex gap-2">
        {accentColors.map((color) => (
          <button
            key={color.id}
            onClick={() => setAccentColorId(color.id)}
            aria-label={color.id}
            style={{ backgroundColor: color.hex }}
            className={`h-8 w-8 rounded-full border-2 ${
              accentColorId === color.id
                ? 'border-gray-900'
                : 'border-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
