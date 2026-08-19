import { createContext, useContext, useState } from 'react'
import { readScores, writeTopScores } from '../utils/gameScores.js'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const [scoresByGame, setScoresByGame] = useState({})

  function getTopScores(gameId) {
    return scoresByGame[gameId] ?? readScores(gameId)
  }

  function submitScore(gameId, { value, label, sortOrder }) {
    const current = scoresByGame[gameId] ?? readScores(gameId)
    const entry = { value, label, timestamp: Date.now() }
    const updated = writeTopScores(gameId, [...current, entry], sortOrder)
    setScoresByGame((prev) => ({ ...prev, [gameId]: updated }))
    return updated
  }

  return (
    <GamesContext.Provider value={{ getTopScores, submitScore }}>
      {children}
    </GamesContext.Provider>
  )
}

export function useGames() {
  const context = useContext(GamesContext)
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider')
  }
  return context
}
