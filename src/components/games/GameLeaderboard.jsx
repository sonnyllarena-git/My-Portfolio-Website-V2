import { useGames } from '../../context/GamesContext.jsx'

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function GameLeaderboard({ gameId, scoreLabel, sortOrder }) {
  const { getTopScores } = useGames()
  const scores = [...getTopScores(gameId)].sort((a, b) =>
    sortOrder === 'asc' ? a.value - b.value : b.value - a.value,
  )

  return (
    <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
      <h3 className="mb-3 text-sm font-bold text-white">
        {scoreLabel} Leaderboard
      </h3>
      {scores.length === 0 ? (
        <p className="text-sm text-gray-400">No scores yet — be the first!</p>
      ) : (
        <ol className="flex flex-col gap-2">
          {scores.map((entry, index) => (
            <li
              key={`${entry.timestamp}-${index}`}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="w-6 shrink-0 font-semibold text-gray-500">
                #{index + 1}
              </span>
              <span className="flex-1 font-medium text-white">
                {entry.value}
                {entry.label ? (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    {entry.label}
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 text-xs text-gray-500">
                {formatDate(entry.timestamp)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
