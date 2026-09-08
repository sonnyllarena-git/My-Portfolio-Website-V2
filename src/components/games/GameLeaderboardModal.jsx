import { useEffect, useState } from 'react'
import { fetchLeaderboard } from '../../utils/leaderboardApi.js'

const RANK_MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' }

function LeaderboardRow({ rank, entry }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
        {RANK_MEDALS[rank] ?? rank}
      </span>
      <span className="flex-1 truncate text-sm font-semibold text-white">
        {entry.name}
      </span>
      {entry.label && (
        <span className="shrink-0 text-xs text-white/40">{entry.label}</span>
      )}
      <span className="shrink-0 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-sm font-bold text-amber-300">
        {entry.score}
      </span>
    </li>
  )
}

export default function GameLeaderboardModal({ game, onClose }) {
  const [scores, setScores] = useState([])
  const [totalPlays, setTotalPlays] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetchLeaderboard(game.id)
      .then((data) => {
        if (cancelled) return
        setScores(data.scores)
        setTotalPlays(data.totalPlays)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [game.id])

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div className="flex max-h-[80vh] w-[26rem] flex-col rounded-lg border border-amber-500/30 bg-[#1a1a1a] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden="true">👑</span>
              {game.title} — Leaderboard
            </h2>
            {totalPlays !== null && (
              <p className="mt-0.5 text-xs text-white/40">
                {totalPlays.toLocaleString()} total plays
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {status === 'loading' && (
            <p className="text-sm text-white/40">Loading leaderboard…</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-white/40">
              Couldn't load the leaderboard right now.
            </p>
          )}
          {status === 'ready' && scores.length === 0 && (
            <p className="text-sm text-white/40">
              No scores yet — be the first!
            </p>
          )}
          {status === 'ready' && scores.length > 0 && (
            <>
              <div className="mb-1.5 flex items-center gap-3 px-1 text-[11px] font-semibold tracking-wide text-white/40 uppercase">
                <span className="w-7 shrink-0" />
                <span className="flex-1">Player</span>
                <span className="shrink-0">{game.scoreLabel}</span>
              </div>
              <ol className="flex flex-col gap-2">
                {scores.map((entry, index) => (
                  <LeaderboardRow
                    key={`${entry.name}-${entry.createdAt}`}
                    rank={index + 1}
                    entry={entry}
                  />
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
