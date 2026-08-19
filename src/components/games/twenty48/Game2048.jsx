import { useEffect, useState } from 'react'
import Grid2048 from './Grid2048.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import { useGames } from '../../../context/GamesContext.jsx'
import {
  createEmptyGrid,
  spawnTile,
  move,
  isGameOver,
} from '../../../utils/games/twenty48Logic.js'

const GAME_ID = '2048'

const KEY_TO_DIRECTION = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
}

function createInitialGrid() {
  return spawnTile(spawnTile(createEmptyGrid()))
}

export default function Game2048() {
  const { submitScore } = useGames()
  const [grid, setGrid] = useState(createInitialGrid)
  const [score, setScore] = useState(0)
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    function handleKeydown(event) {
      const direction = KEY_TO_DIRECTION[event.key]
      if (!direction || isOver) return
      event.preventDefault()
      const result = move(grid, direction)
      if (!result.moved) return

      const nextGrid = spawnTile(result.grid)
      const nextScore = score + result.scoreDelta
      setGrid(nextGrid)
      setScore(nextScore)

      if (isGameOver(nextGrid)) {
        submitScore(GAME_ID, { value: nextScore, sortOrder: 'desc' })
        setIsOver(true)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [grid, score, isOver, submitScore])

  function handlePlayAgain() {
    setGrid(createInitialGrid())
    setScore(0)
    setIsOver(false)
  }

  if (isOver) {
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
            scoreLabel="Best Score"
            sortOrder="desc"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 bg-[#0d0d0d] p-6">
      <div className="flex w-full max-w-sm items-center justify-between">
        <h2 className="text-xl font-bold text-white">2048</h2>
        <div className="rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold text-white">
          Score: {score}
        </div>
      </div>
      <Grid2048 grid={grid} />
    </div>
  )
}
