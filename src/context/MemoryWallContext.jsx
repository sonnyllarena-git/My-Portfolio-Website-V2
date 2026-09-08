import { createContext, useContext, useState } from 'react'
import {
  fetchMemoryWallNotes,
  submitMemoryWallNote,
} from '../utils/memoryWallApi.js'

const MemoryWallContext = createContext(null)

export function MemoryWallProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  async function loadNotes() {
    if (loaded) return
    setLoading(true)
    try {
      const rows = await fetchMemoryWallNotes()
      setNotes(rows)
      setLoaded(true)
    } finally {
      setLoading(false)
    }
  }

  async function addNote({ name, message, rating }) {
    const created = await submitMemoryWallNote({ name, message, rating })
    setNotes((prev) => [created, ...prev])
    return created
  }

  return (
    <MemoryWallContext.Provider value={{ notes, loading, loadNotes, addNote }}>
      {children}
    </MemoryWallContext.Provider>
  )
}

export function useMemoryWall() {
  const context = useContext(MemoryWallContext)
  if (!context) {
    throw new Error('useMemoryWall must be used within a MemoryWallProvider')
  }
  return context
}
