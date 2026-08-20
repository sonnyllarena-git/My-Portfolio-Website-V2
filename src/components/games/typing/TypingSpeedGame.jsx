import { useState } from 'react'
import TypingStartScreen from './TypingStartScreen.jsx'
import TierWarningBanner from './TierWarningBanner.jsx'
import TypingTestArea from './TypingTestArea.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import mapBackground from './assets/components/map.avif'
import {
  getLevelInfo,
  isTierStart,
  pickWarning,
} from '../../../utils/games/typingLevels.js'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'typing-speed'
const LEVEL_DURATION_MS = 20000

export default function TypingSpeedGame() {
  const { submitScore } = useGames()
  const [phase, setPhase] = useState('start')
  const [level, setLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState(0)
  const [warningText, setWarningText] = useState('')

  function handleStart() {
    setPhase('playing')
  }

  function handleWarningDismiss() {
    setPhase('playing')
  }

  function handleTimeout() {
    submitScore(GAME_ID, {
      value: completedLevels,
      label: getLevelInfo(level).tierName,
      sortOrder: 'desc',
    })
    setPhase('game-over')
  }

  function handleLevelComplete() {
    const newCompleted = completedLevels + 1
    setCompletedLevels(newCompleted)
    if (level >= 100) {
      submitScore(GAME_ID, {
        value: newCompleted,
        label: getLevelInfo(level).tierName,
        sortOrder: 'desc',
      })
      setPhase('game-over')
      return
    }
    const nextLevel = level + 1
    setLevel(nextLevel)
    if (isTierStart(nextLevel)) {
      setWarningText(pickWarning())
      setPhase('tier-warning')
    }
  }

  function handlePlayAgain() {
    setLevel(1)
    setCompletedLevels(0)
    setWarningText('')
    setPhase('start')
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0d0d0d]">
      {phase === 'start' && <TypingStartScreen onStart={handleStart} />}

      {(phase === 'tier-warning' || phase === 'playing') && (
        <div
          className="flex h-full w-full items-center justify-center bg-cover bg-center p-6"
          style={{ backgroundImage: `url(${mapBackground})` }}
        >
          <div className="relative w-full max-w-xl">
            {phase === 'tier-warning' && (
              <TierWarningBanner
                text={warningText}
                onDismiss={handleWarningDismiss}
              />
            )}
            {phase === 'playing' && (
              <TypingTestArea
                key={level}
                level={level}
                durationMs={LEVEL_DURATION_MS}
                onLevelComplete={handleLevelComplete}
                onTimeout={handleTimeout}
              />
            )}
          </div>
        </div>
      )}

      {phase === 'game-over' && (
        <div className="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto p-6 text-center text-white">
          <h2 className="text-xl font-bold">Game Over</h2>
          <p className="text-3xl font-bold">
            {completedLevels} {completedLevels === 1 ? 'Level' : 'Levels'}{' '}
            Completed
          </p>
          <p className="text-sm text-gray-400">
            {getLevelInfo(level).tierName}
          </p>
          <button
            type="button"
            onClick={handlePlayAgain}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Play Again
          </button>
          <div className="w-full max-w-xs">
            <GameLeaderboard
              gameId={GAME_ID}
              scoreLabel="Highest Level"
              sortOrder="desc"
            />
          </div>
        </div>
      )}
    </div>
  )
}
