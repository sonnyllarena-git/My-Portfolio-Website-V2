import { createContext, useContext, useState } from 'react'
import {
  readScores,
  writeTopScores,
  readPlayCount,
  incrementPlayCount,
} from '../utils/gameScores.js'
import {
  readRatings,
  addRating,
  getAverageRating as computeAverageRating,
} from '../utils/gameRatings.js'
import {
  readVisitorName,
  writeVisitorName,
  clearVisitorName,
} from '../utils/gameVisitor.js'
import {
  readArcadeSettings,
  writeArcadeSettings,
} from '../utils/arcadeSettings.js'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const [scoresByGame, setScoresByGame] = useState({})
  const [playsByGame, setPlaysByGame] = useState({})
  const [ratingsByGame, setRatingsByGame] = useState({})
  const [visitorName, setVisitorNameState] = useState(() => readVisitorName())
  const [arcadeSettings, setArcadeSettings] = useState(() =>
    readArcadeSettings(),
  )

  function getTopScores(gameId) {
    return scoresByGame[gameId] ?? readScores(gameId)
  }

  function getTotalPlays(gameId) {
    return playsByGame[gameId] ?? readPlayCount(gameId)
  }

  function getRatings(gameId) {
    return ratingsByGame[gameId] ?? readRatings(gameId)
  }

  function getAverageRating(gameId) {
    return computeAverageRating(getRatings(gameId))
  }

  function submitRating(gameId, { name, rating, comment }) {
    const updated = addRating(gameId, { name, rating, comment })
    setRatingsByGame((prev) => ({ ...prev, [gameId]: updated }))
    return updated
  }

  function setVisitorName(name) {
    writeVisitorName(name)
    setVisitorNameState(name)
  }

  function logout() {
    clearVisitorName()
    setVisitorNameState(null)
  }

  function setSoundMuted(muted) {
    setArcadeSettings(writeArcadeSettings({ soundMuted: muted }))
  }

  function setBackgroundId(id) {
    setArcadeSettings(writeArcadeSettings({ backgroundId: id }))
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
    <GamesContext.Provider
      value={{
        getTopScores,
        submitScore,
        getTotalPlays,
        getRatings,
        getAverageRating,
        submitRating,
        visitorName,
        setVisitorName,
        logout,
        soundMuted: arcadeSettings.soundMuted,
        setSoundMuted,
        backgroundId: arcadeSettings.backgroundId,
        setBackgroundId,
      }}
    >
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
