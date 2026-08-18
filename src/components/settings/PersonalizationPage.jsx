import { useSystemSettings } from '../../context/SystemSettingsContext.jsx'
import { accentColors } from '../../data/accentColors.js'
import { wallpapers } from '../../data/wallpapers.js'

function PersonalizationPage() {
  const {
    wallpaperId,
    setWallpaperId,
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
  } = useSystemSettings()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Personalization</h2>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/70 uppercase">
          Background
        </h3>
        <div className="grid grid-cols-4 gap-3 rounded-lg border border-white/10 bg-[#181a20] p-4">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              type="button"
              onClick={() => setWallpaperId(wallpaper.id)}
              aria-label={wallpaper.label}
              className={`relative h-20 rounded-md border-2 bg-cover bg-center ${
                wallpaperId === wallpaper.id
                  ? 'border-blue-500'
                  : 'border-transparent'
              }`}
              style={{ backgroundImage: wallpaper.swatch }}
            >
              {wallpaperId === wallpaper.id && (
                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/70 uppercase">
          Colors
        </h3>
        <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
          <div className="mb-3 text-sm font-medium">Choose your mode</div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            {['light', 'dark'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setThemeMode(mode)}
                className={`rounded-lg border-2 p-4 text-center capitalize ${
                  themeMode === mode ? 'border-blue-500' : 'border-white/10'
                }`}
              >
                <div className="text-xl">{mode === 'light' ? '☀️' : '🌙'}</div>
                <div className="mt-1">{mode}</div>
              </button>
            ))}
          </div>
          <div className="mb-2 text-sm font-medium">Accent color</div>
          <div className="flex gap-2">
            {accentColors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setAccentColor(color.id)}
                aria-label={color.id}
                className={`h-8 w-8 rounded-full border-2 ${
                  accentColor === color.id
                    ? 'border-white'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizationPage
