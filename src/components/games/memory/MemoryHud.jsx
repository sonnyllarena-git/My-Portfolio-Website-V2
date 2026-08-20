const MAX_LIVES = 5

export default function MemoryHud({
  level,
  lives,
  moves,
  elapsedMs,
  bestScore,
  totalPlays,
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-2 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Memory Flip</h2>
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-gray-200">
            Level {level}
          </span>
        </div>
        <span className="text-sm text-gray-300">
          {Array.from({ length: MAX_LIVES }, (_, i) =>
            i < lives ? '❤️' : '🖤',
          ).join('')}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Best Score:{' '}
          <span className="font-semibold text-white">{bestScore ?? '—'}</span>
        </span>
        <span>
          Total Plays:{' '}
          <span className="font-semibold text-white">{totalPlays}</span>
        </span>
        <span>Moves: {moves}</span>
        <span>Time: {(elapsedMs / 1000).toFixed(1)}s</span>
      </div>
    </div>
  )
}
