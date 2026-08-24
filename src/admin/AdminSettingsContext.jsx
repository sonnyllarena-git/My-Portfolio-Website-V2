import { createContext, useContext, useEffect, useState } from 'react'
import { accentColors } from '../data/accentColors.js'

const AdminSettingsContext = createContext(null)
const ACCENT_STORAGE_KEY = 'adminAccentColor'
const DEFAULT_ACCENT_ID = 'blue'

export function AdminSettingsProvider({ children }) {
  const [accentColorId, setAccentColorId] = useState(
    () => localStorage.getItem(ACCENT_STORAGE_KEY) || DEFAULT_ACCENT_ID,
  )

  useEffect(() => {
    localStorage.setItem(ACCENT_STORAGE_KEY, accentColorId)
  }, [accentColorId])

  const accentHex =
    accentColors.find((color) => color.id === accentColorId)?.hex ??
    accentColors[0].hex

  return (
    <AdminSettingsContext.Provider
      value={{ accentColorId, setAccentColorId, accentHex }}
    >
      {children}
    </AdminSettingsContext.Provider>
  )
}

export function useAdminSettings() {
  const context = useContext(AdminSettingsContext)
  if (!context) {
    throw new Error(
      'useAdminSettings must be used within an AdminSettingsProvider',
    )
  }
  return context
}
