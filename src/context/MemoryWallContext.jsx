import { createContext, useContext, useState } from 'react'
import { memoryWallNotes } from '../data/memoryWallNotes.js'

const MemoryWallContext = createContext(null)

export function MemoryWallProvider({ children }) {
  const [notes, setNotes] = useState(memoryWallNotes)

  function addNote(note) {
    setNotes((prev) => [note, ...prev])
  }

  return (
    <MemoryWallContext.Provider value={{ notes, addNote }}>
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
