import { useState } from 'react'
import { gamesCatalog } from '../../data/gamesCatalog.js'
import { useGames } from '../../context/GamesContext.jsx'
import GameRatingModal from './GameRatingModal.jsx'

function bestScorePreview(getTopScores, game) {
  const [top] = getTopScores(game.id)
  return top ? `${game.scoreLabel}: ${top.value}` : 'No scores yet'
}

function RatingBadge({ average, count }) {
  if (average === null) {
    return <span className="text-xs text-gray-500">No ratings yet</span>
  }
  const filled = Math.round(average)
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
      {average.toFixed(1)}
      <span aria-hidden="true">
        {'★'.repeat(filled)}
        {'☆'.repeat(5 - filled)}
      </span>
      <span className="text-amber-300/60">({count})</span>
    </span>
  )
}

function RateButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="mt-2 w-full rounded-lg border border-white/10 py-1.5 text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white"
    >
      View/Add Rate
    </button>
  )
}

function GameTile({ game, preview, average, onSelectGame, onViewRatings }) {
  const isReady = game.status === 'ready'
  return (
    <div
      className={`flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-[#141414] p-4 ${
        isReady ? '' : 'opacity-50'
      }`}
    >
      <button
        type="button"
        disabled={!isReady}
        onClick={() => onSelectGame(game.id)}
        className={`flex w-full flex-col items-start gap-2 text-left transition-colors ${
          isReady ? '' : 'cursor-not-allowed'
        }`}
      >
        <div className="flex w-full items-center justify-between">
          {game.iconImage ? (
            <img
              src={game.iconImage}
              alt=""
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <span className="text-3xl">{game.icon}</span>
          )}
          {!isReady && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-gray-300">
              Coming soon
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-white">{game.title}</h3>
        <p className="text-sm text-gray-400">{game.tagline}</p>
        <p className="text-xs font-medium text-gray-500">{preview}</p>
        <RatingBadge average={average.average} count={average.count} />
      </button>
      <RateButton onClick={() => onViewRatings(game)} />
    </div>
  )
}

function FeaturedGameTile({
  game,
  bestScore,
  totalPlays,
  average,
  onSelectGame,
  onViewRatings,
}) {
  const isReady = game.status === 'ready'
  return (
    <div
      className={`flex flex-col self-start overflow-hidden rounded-xl border-2 border-amber-500/50 bg-[#141414] sm:row-span-2 ${
        isReady ? '' : 'opacity-50'
      }`}
    >
      <button
        type="button"
        disabled={!isReady}
        onClick={() => onSelectGame(game.id)}
        className={`flex flex-col text-left transition-colors ${
          isReady ? 'hover:border-amber-400' : 'cursor-not-allowed'
        }`}
      >
        <img
          src={game.thumbnail}
          alt={game.title}
          className="aspect-video w-full object-cover"
        />
        <div className="flex flex-col gap-2 px-4 py-3">
          <h3 className="text-base font-bold text-white">{game.title}</h3>
          <p className="text-xs font-bold tracking-wide text-gray-400">
            BEST SCORE: <span className="text-white">{bestScore ?? '—'}</span>
          </p>
          <p className="text-xs font-bold tracking-wide text-gray-400">
            TOTAL PLAYS: <span className="text-white">{totalPlays}</span>
          </p>
          <RatingBadge average={average.average} count={average.count} />
        </div>
      </button>
      <div className="px-4 pb-3">
        <RateButton onClick={() => onViewRatings(game)} />
      </div>
    </div>
  )
}

export default function GamesHub({ onSelectGame }) {
  const { getTopScores, getTotalPlays, getAverageRating } = useGames()
  const [ratingModalGame, setRatingModalGame] = useState(null)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gamesCatalog.map((game) => {
        const average = getAverageRating(game.id)
        if (game.thumbnail) {
          const [top] = getTopScores(game.id)
          return (
            <FeaturedGameTile
              key={game.id}
              game={game}
              bestScore={top?.value}
              totalPlays={getTotalPlays(game.id)}
              average={average}
              onSelectGame={onSelectGame}
              onViewRatings={setRatingModalGame}
            />
          )
        }
        return (
          <GameTile
            key={game.id}
            game={game}
            preview={bestScorePreview(getTopScores, game)}
            average={average}
            onSelectGame={onSelectGame}
            onViewRatings={setRatingModalGame}
          />
        )
      })}
      {ratingModalGame && (
        <GameRatingModal
          game={ratingModalGame}
          onClose={() => setRatingModalGame(null)}
        />
      )}
    </div>
  )
}
