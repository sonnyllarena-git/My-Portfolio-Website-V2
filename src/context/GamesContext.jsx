import { createContext, useContext, useState } from 'react'
import {
  readScores,
  writeTopScores,
  readPlayCount,
  incrementPlayCount,
} from '../utils/gameScores.js'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const [scoresByGame, setScoresByGame] = useState({})
  const [playsByGame, setPlaysByGame] = useState({})

  function getTopScores(gameId) {
    return scoresByGame[gameId] ?? readScores(gameId)
  }

  function getTotalPlays(gameId) {
    return playsByGame[gameId] ?? readPlayCount(gameId)
  }

  function submitScore(gameId, { value, label, sortOrder }) {
    const current = scoresByGame[gameId] ?? readScores(gameId)
    const entry = { value, label, timestamp: Date.now() }
    const updated = writeTopScores(gameId, [...current, entry], sortOrder)
    setScoresByGame((prev) => ({ ...prev, [gameId]: updated }))
    setPlaysByGame((prev) => ({
      ...prev,
      [gameId]: incrementPlayCount(gameId),
    }))
    return updated
  }

  return (
    <GamesContext.Provider value={{ getTopScores, submitScore, getTotalPlays }}>
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
