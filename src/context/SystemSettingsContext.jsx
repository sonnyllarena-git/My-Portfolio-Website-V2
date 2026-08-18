import { createContext, useContext, useState } from 'react'

const SystemSettingsContext = createContext(null)

export function SystemSettingsProvider({ children }) {
  const [brightness, setBrightness] = useState(100)
  const [volume, setVolume] = useState(70)
  const [wallpaperId, setWallpaperId] = useState('cyber')
  const [themeMode, setThemeMode] = useState('dark')
  const [accentColor, setAccentColor] = useState('blue')

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
