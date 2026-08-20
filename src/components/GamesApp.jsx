import { useState } from 'react'
import { gamesCatalog } from '../data/gamesCatalog.js'
import { arcadeBackgrounds } from '../data/arcadeBackgrounds.js'
import { getGreeting } from '../utils/greeting.js'
import { useGames } from '../context/GamesContext.jsx'
import GamesHub from './games/GamesHub.jsx'
import GamesSettingsMenu from './games/GamesSettingsMenu.jsx'
import FlappyBirdGame from './games/flappybird/FlappyBirdGame.jsx'
import TypingSpeedGame from './games/typing/TypingSpeedGame.jsx'
import MemoryFlipGame from './games/memory/MemoryFlipGame.jsx'

const GAME_COMPONENTS = {
  'flappy-bird': FlappyBirdGame,
  'typing-speed': TypingSpeedGame,
  'memory-flip': MemoryFlipGame,
}

export default function GamesApp({ onOpenGmail, onOpenZoomChat, onLogout }) {
  const {
    visitorName,
    soundMuted,
    setSoundMuted,
    backgroundId,
    setBackgroundId,
  } = useGames()
  const [activeGameId, setActiveGameId] = useState(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [greeting] = useState(() =>
    getGreeting(new Date().getHours(), visitorName ?? 'Guest'),
  )
  const activeGame = gamesCatalog.find((game) => game.id === activeGameId)

  if (!activeGame) {
    const background =
      arcadeBackgrounds.find((bg) => bg.id === backgroundId) ??
      arcadeBackgrounds[0]
    return (
      <div className={`h-full overflow-y-auto p-6 ${background.className}`}>
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Arcade</h1>
              <p className="text-sm text-gray-400">
                Explore a suite of custom-engineered web experiences designed,
                developed, and deployed independently by Sonny. Featuring
                optimized state management, real-time leaderboard tracking,
                and lightweight frontend architecture.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-medium text-cyan-300">
                Logged in as {visitorName ?? 'Guest'}
              </span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base"
              >
                👤
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base hover:border-white/30"
                  aria-label="Arcade settings"
                >
                  ⚙️
                </button>
                {settingsOpen && (
                  <GamesSettingsMenu
                    soundMuted={soundMuted}
                    setSoundMuted={setSoundMuted}
                    backgroundId={backgroundId}
                    setBackgroundId={setBackgroundId}
                    onLogout={onLogout}
                    onOpenZoomChat={onOpenZoomChat}
                    onOpenGmail={onOpenGmail}
                    onClose={() => setSettingsOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-300">{greeting}</p>
        </div>
        <GamesHub onSelectGame={setActiveGameId} />
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2026 Sonny. All rights reserved. For commercial partnerships,
          technical consultations, or business inquiries, contact Sonny.
        </p>
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
          <GameComponent onExit={() => setActiveGameId(null)} />
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
