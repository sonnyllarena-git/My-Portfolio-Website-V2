import { createContext, useContext, useEffect, useState } from 'react'

const SystemSettingsContext = createContext(null)
const WALLPAPER_STORAGE_KEY = 'wallpaperId'
const CURSOR_STORAGE_KEY = 'cursorStyle'

export function SystemSettingsProvider({ children }) {
  const [brightness, setBrightness] = useState(100)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isVolumeFlyoutOpen, setIsVolumeFlyoutOpen] = useState(false)
  const [wallpaperId, setWallpaperId] = useState(
    () => localStorage.getItem(WALLPAPER_STORAGE_KEY) || 'cyber',
  )
  const [themeMode, setThemeMode] = useState('dark')
  const [accentColor, setAccentColor] = useState('blue')
  const [cursorStyle, setCursorStyle] = useState(
    () => localStorage.getItem(CURSOR_STORAGE_KEY) || 'default',
  )

  useEffect(() => {
    localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaperId)
  }, [wallpaperId])

  useEffect(() => {
    localStorage.setItem(CURSOR_STORAGE_KEY, cursorStyle)
  }, [cursorStyle])

  return (
    <SystemSettingsContext.Provider
      value={{
        brightness,
        setBrightness,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        isVolumeFlyoutOpen,
        setIsVolumeFlyoutOpen,
        wallpaperId,
        setWallpaperId,
        themeMode,
        setThemeMode,
        accentColor,
        setAccentColor,
        cursorStyle,
        setCursorStyle,
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
