import { useState } from 'react'
import { gamesCatalog } from '../data/gamesCatalog.js'
import GamesHub from './games/GamesHub.jsx'
import FlappyBirdGame from './games/flappybird/FlappyBirdGame.jsx'
import Game2048 from './games/twenty48/Game2048.jsx'
import RunnerGame from './games/runner/RunnerGame.jsx'
import TypingSpeedGame from './games/typing/TypingSpeedGame.jsx'

const GAME_COMPONENTS = {
  'flappy-bird': FlappyBirdGame,
  2048: Game2048,
  'endless-runner': RunnerGame,
  'typing-speed': TypingSpeedGame,
}

export default function GamesApp() {
  const [activeGameId, setActiveGameId] = useState(null)
  const activeGame = gamesCatalog.find((game) => game.id === activeGameId)

  if (!activeGame) {
    return (
      <div className="h-full overflow-y-auto bg-[#0d0d0d] p-6">
        <h1 className="mb-1 text-2xl font-bold text-white">Arcade</h1>
        <p className="mb-6 text-sm text-gray-400">
          Pick a game and try to top the leaderboard.
        </p>
        <GamesHub onSelectGame={setActiveGameId} />
      </div>
    )
  }

  const GameComponent = GAME_COMPONENTS[activeGame.id]
  if (GameComponent) {
    return (
      <div className="flex h-full flex-col bg-[#0d0d0d]">
        <button
          type="button"
          onClick={() => setActiveGameId(null)}
          className="self-start p-4 text-sm font-medium text-gray-400 hover:text-white"
        >
          ← Back to Arcade
        </button>
        <div className="flex-1 overflow-y-auto">
          <GameComponent />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#0d0d0d] p-6">
      <button
        type="button"
        onClick={() => setActiveGameId(null)}
        className="mb-4 self-start text-sm font-medium text-gray-400 hover:text-white"
      >
        ← Back to Arcade
      </button>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        {activeGame.iconImage ? (
          <img
            src={activeGame.iconImage}
            alt=""
            className="h-16 w-16 rounded-xl object-cover"
          />
        ) : (
          <span className="text-5xl">{activeGame.icon}</span>
        )}
        <h2 className="text-xl font-bold text-white">{activeGame.title}</h2>
        <p className="text-sm text-gray-400">Coming soon</p>
      </div>
    </div>
  )
}
