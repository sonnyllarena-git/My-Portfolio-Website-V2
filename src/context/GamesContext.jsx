import { createContext, useContext, useState } from 'react'
import {
  readScores,
  writeTopScores,
  readPlayCount,
  incrementPlayCount,
} from '../utils/gameScores.js'
import { getAverageRating as computeAverageRating } from '../utils/gameRatings.js'
import {
  readVisitorName,
  writeVisitorName,
  clearVisitorName,
} from '../utils/gameVisitor.js'
import {
  readArcadeSettings,
  writeArcadeSettings,
} from '../utils/arcadeSettings.js'
import {
  fetchLeaderboard,
  submitLeaderboardScore,
} from '../utils/leaderboardApi.js'
import { fetchRatings, submitRatingApi } from '../utils/ratingsApi.js'

const GamesContext = createContext(null)

export function GamesProvider({ children }) {
  const [scoresByGame, setScoresByGame] = useState({})
  const [playsByGame, setPlaysByGame] = useState({})
  const [ratingsByGame, setRatingsByGame] = useState({})
  const [ratingsLoaded, setRatingsLoaded] = useState({})
  const [leaderboardByGame, setLeaderboardByGame] = useState({})
  const [leaderboardLoaded, setLeaderboardLoaded] = useState({})
  const [leaderboardSyncFailedByGame, setLeaderboardSyncFailedByGame] =
    useState({})
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

  function getGlobalTopScore(gameId) {
    return leaderboardByGame[gameId]?.scores?.[0]?.score ?? null
  }

  function getGlobalTotalPlays(gameId) {
    return leaderboardByGame[gameId]?.totalPlays ?? 0
  }

  async function loadLeaderboard(gameId) {
    if (leaderboardLoaded[gameId]) return
    setLeaderboardLoaded((prev) => ({ ...prev, [gameId]: true }))
    try {
      const data = await fetchLeaderboard(gameId)
      setLeaderboardByGame((prev) => ({ ...prev, [gameId]: data }))
    } catch {
      setLeaderboardLoaded((prev) => ({ ...prev, [gameId]: false }))
    }
  }

  function getRatings(gameId) {
    return ratingsByGame[gameId] ?? []
  }

  function getAverageRating(gameId) {
    return computeAverageRating(getRatings(gameId))
  }

  async function loadRatings(gameId) {
    if (ratingsLoaded[gameId]) return
    setRatingsLoaded((prev) => ({ ...prev, [gameId]: true }))
    try {
      const rows = await fetchRatings(gameId)
      setRatingsByGame((prev) => ({ ...prev, [gameId]: rows }))
    } catch {
      setRatingsLoaded((prev) => ({ ...prev, [gameId]: false }))
    }
  }

  async function submitRating(gameId, { name, rating, comment }) {
    const updated = await submitRatingApi(gameId, { name, rating, comment })
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
    submitLeaderboardScore(gameId, {
      name: visitorName ?? 'Guest',
      score: value,
      label,
    })
      .then((data) => {
        setLeaderboardByGame((prev) => ({ ...prev, [gameId]: data }))
        setLeaderboardSyncFailedByGame((prev) => ({ ...prev, [gameId]: false }))
      })
      .catch(() => {
        // A network hiccup shouldn't break gameplay, but the player should still be able
        // to tell their score never reached the global leaderboard — see getLeaderboardSyncFailed.
        setLeaderboardSyncFailedByGame((prev) => ({ ...prev, [gameId]: true }))
      })
    return updated
  }

  function getLeaderboardSyncFailed(gameId) {
    return leaderboardSyncFailedByGame[gameId] ?? false
  }

  return (
    <GamesContext.Provider
      value={{
        getTopScores,
        submitScore,
        getTotalPlays,
        getGlobalTopScore,
        getGlobalTotalPlays,
        loadLeaderboard,
        getLeaderboardSyncFailed,
        getRatings,
        getAverageRating,
        loadRatings,
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
