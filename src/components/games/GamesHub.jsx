import { useState } from 'react'
import { gamesCatalog } from '../../data/gamesCatalog.js'
import { useGames } from '../../context/GamesContext.jsx'
import GameRatingModal from './GameRatingModal.jsx'
import playButtonImage from './assets/play button games screen.png'

function RatingButton({ average, count, onClick }) {
  function handleClick(e) {
    e.stopPropagation()
    onClick()
  }

  if (average === null) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer text-xs text-gray-500 transition-colors hover:text-gray-300 hover:underline"
      >
        No ratings yet
      </button>
    )
  }
  const filled = Math.round(average)
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/30 hover:text-amber-200"
    >
      {average.toFixed(1)}
      <span aria-hidden="true">
        {'★'.repeat(filled)}
        {'☆'.repeat(5 - filled)}
      </span>
      <span className="text-amber-300/60">({count})</span>
    </button>
  )
}

function GameCard({
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
      className={`flex flex-col overflow-hidden rounded-xl border-2 border-amber-500/50 bg-[#141414] ${
        isReady ? '' : 'opacity-50'
      }`}
    >
      <div className="aspect-[2/1] w-full overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="relative z-10 -mt-[10.28%] flex justify-center">
        <button
          type="button"
          disabled={!isReady}
          onClick={() => onSelectGame(game.id)}
          aria-label={`Play ${game.title}`}
          className={`aspect-[335/153] w-[45%] min-w-[120px] overflow-hidden transition-transform ${
            isReady ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'
          }`}
        >
          <img src={playButtonImage} alt="" className="-mt-[17.61%] w-full" />
        </button>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-3">
        <h3 className="text-base font-bold text-white">{game.title}</h3>
        <p className="text-xs font-bold tracking-wide text-gray-400">
          BEST SCORE: <span className="text-white">{bestScore ?? '—'}</span>
        </p>
        <p className="text-xs font-bold tracking-wide text-gray-400">
          TOTAL PLAYS: <span className="text-white">{totalPlays}</span>
        </p>
      </div>
      <div className="px-4 pb-3">
        <RatingButton
          average={average.average}
          count={average.count}
          onClick={() => onViewRatings(game)}
        />
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
        const [top] = getTopScores(game.id)
        return (
          <GameCard
            key={game.id}
            game={game}
            bestScore={top?.value}
            totalPlays={getTotalPlays(game.id)}
            average={getAverageRating(game.id)}
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
