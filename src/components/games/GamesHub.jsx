import { gamesCatalog } from '../../data/gamesCatalog.js'
import { useGames } from '../../context/GamesContext.jsx'

function bestScorePreview(getTopScores, game) {
  const [top] = getTopScores(game.id)
  return top ? `${game.scoreLabel}: ${top.value}` : 'No scores yet'
}

function GameTile({ game, preview, onSelectGame }) {
  const isReady = game.status === 'ready'
  return (
    <button
      type="button"
      disabled={!isReady}
      onClick={() => onSelectGame(game.id)}
      className={`flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-[#141414] p-4 text-left transition-colors ${
        isReady ? 'hover:border-white/30' : 'cursor-not-allowed opacity-50'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-3xl">{game.icon}</span>
        {!isReady && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-gray-300">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-white">{game.title}</h3>
      <p className="text-sm text-gray-400">{game.tagline}</p>
      <p className="text-xs font-medium text-gray-500">{preview}</p>
    </button>
  )
}

export default function GamesHub({ onSelectGame }) {
  const { getTopScores } = useGames()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gamesCatalog.map((game) => (
        <GameTile
          key={game.id}
          game={game}
          preview={bestScorePreview(getTopScores, game)}
          onSelectGame={onSelectGame}
        />
      ))}
    </div>
  )
}
