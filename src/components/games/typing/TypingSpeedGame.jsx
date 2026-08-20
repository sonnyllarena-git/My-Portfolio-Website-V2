import { useEffect, useState } from 'react'
import TypingStartScreen from './TypingStartScreen.jsx'
import TierWarningBanner from './TierWarningBanner.jsx'
import TypingTestArea from './TypingTestArea.jsx'
import TypingGameOverOverlay from './TypingGameOverOverlay.jsx'
import mapBackground from './assets/components/map.avif'
import backgroundMusic from './assets/sound/typing background music.mp3'
import {
  getLevelInfo,
  isTierStart,
  pickWarning,
} from '../../../utils/games/typingLevels.js'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'typing-speed'
const LEVEL_DURATION_MS = 20000

export default function TypingSpeedGame({ onExit }) {
  const { submitScore } = useGames()
  const [phase, setPhase] = useState('start')
  const [level, setLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState(0)
  const [warningText, setWarningText] = useState('')

  useEffect(() => {
    const music = new Audio(backgroundMusic)
    music.loop = true
    music.play().catch(() => {})
    return () => {
      music.pause()
    }
  }, [])

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

      {phase !== 'start' && (
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
        <TypingGameOverOverlay
          score={completedLevels}
          onReplay={handlePlayAgain}
          onExit={() => onExit?.()}
        />
      )}
    </div>
  )
}
