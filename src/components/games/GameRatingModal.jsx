import { useState } from 'react'
import { useGames } from '../../context/GamesContext.jsx'

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StarDisplay({ rating }) {
  return (
    <span className="shrink-0 text-sm text-yellow-400">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function StarRatingInput({ rating, onChange }) {
  return (
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange(n)}
          className={n <= rating ? 'text-yellow-400' : 'text-white/20'}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function RatingCard({ entry }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-white">{entry.name}</span>
        <StarDisplay rating={entry.rating} />
      </div>
      <div className="mt-0.5 text-xs text-white/40">
        {formatTimestamp(entry.timestamp)}
      </div>
      {entry.comment && (
        <p className="mt-2 text-sm text-white/80">{entry.comment}</p>
      )}
    </div>
  )
}

function GameRatingModal({ game, onClose }) {
  const { getRatings, submitRating, visitorName } = useGames()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [showAddedToast, setShowAddedToast] = useState(false)

  const ratings = [...getRatings(game.id)].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  )

  function handleSubmit() {
    if (rating === 0) return
    submitRating(game.id, {
      name: visitorName ?? 'Guest',
      rating,
      comment: comment.trim(),
    })
    setRating(0)
    setComment('')
    setShowAddedToast(true)
    setTimeout(() => setShowAddedToast(false), 2000)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div className="relative flex max-h-[80vh] w-[26rem] flex-col rounded-lg border border-white/10 bg-[#1a1a1a] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-sm font-semibold">{game.title} — Ratings</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {ratings.length === 0 ? (
            <p className="text-sm text-white/40">No ratings yet.</p>
          ) : (
            ratings.map((entry) => <RatingCard key={entry.id} entry={entry} />)
          )}
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="mb-2 text-xs font-semibold text-white/60">
            Rating as {visitorName ?? 'Guest'}
          </p>
          <StarRatingInput rating={rating} onChange={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment (optional)"
            className="mt-3 h-20 w-full resize-none rounded bg-white/10 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="mt-3 w-full rounded bg-cyan-500 px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Rating
          </button>
        </div>
        {showAddedToast && (
          <div className="absolute top-16 left-1/2 z-10 -translate-x-1/2 rounded bg-black/90 px-3 py-1.5 text-xs text-white shadow-lg">
            Rate has been added
          </div>
        )}
      </div>
    </div>
  )
}

export default GameRatingModal
