import { useEffect, useState } from 'react'
import RunnerCanvas from './RunnerCanvas.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'endless-runner'

export default function RunnerGame() {
  const { submitScore } = useGames()
  const [phase, setPhase] = useState('start')
  const [runKey, setRunKey] = useState(0)
  const [score, setScore] = useState(0)

  function handleStart() {
    setPhase('playing')
  }

  useEffect(() => {
    if (phase !== 'start') return
    function handleKeydown(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        handleStart()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [phase])

  function handleGameOver(finalScore) {
    setScore(finalScore)
    submitScore(GAME_ID, { value: finalScore, sortOrder: 'desc' })
    setPhase('game-over')
  }

  function handlePlayAgain() {
    setRunKey((key) => key + 1)
    setPhase('start')
  }

  if (phase === 'start') {
    return (
      <div
        onClick={handleStart}
        className="flex h-full cursor-pointer flex-col items-center justify-center gap-4 bg-[#0d0d0d] text-center"
      >
        <span className="text-5xl">🏃</span>
        <h2 className="text-xl font-bold text-white">Endless Runner</h2>
        <p className="text-sm text-gray-400">Click or press Space to start</p>
      </div>
    )
  }

  if (phase === 'game-over') {
    return (
      <div className="flex h-full flex-col items-center gap-4 overflow-y-auto bg-[#0d0d0d] p-6 text-center">
        <h2 className="text-xl font-bold text-white">Game Over</h2>
        <p className="text-3xl font-bold text-white">{score}</p>
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
            scoreLabel="Best Distance"
            sortOrder="desc"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      key={runKey}
      className="flex h-full items-center justify-center bg-[#0d0d0d]"
    >
      <RunnerCanvas onGameOver={handleGameOver} />
    </div>
  )
}
