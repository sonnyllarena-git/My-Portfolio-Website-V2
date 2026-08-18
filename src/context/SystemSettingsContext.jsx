import { createContext, useContext, useEffect, useState } from 'react'

const SystemSettingsContext = createContext(null)
const WALLPAPER_STORAGE_KEY = 'wallpaperId'

export function SystemSettingsProvider({ children }) {
  const [brightness, setBrightness] = useState(100)
  const [volume, setVolume] = useState(70)
  const [wallpaperId, setWallpaperId] = useState(
    () => localStorage.getItem(WALLPAPER_STORAGE_KEY) || 'cyber',
  )
  const [themeMode, setThemeMode] = useState('dark')
  const [accentColor, setAccentColor] = useState('blue')

  useEffect(() => {
    localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaperId)
  }, [wallpaperId])

  return (
    <SystemSettingsContext.Provider
      value={{
        brightness,
        setBrightness,
        volume,
        setVolume,
        wallpaperId,
        setWallpaperId,
        themeMode,
        setThemeMode,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </SystemSettingsContext.Provider>
  )
}

export function useSystemSettings() {
  const context = useContext(SystemSettingsContext)
  if (!context) {
    throw new Error(
      'useSystemSettings must be used within a SystemSettingsProvider',
    )
  }
  return context
}
