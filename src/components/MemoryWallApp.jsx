import { useState } from 'react'
import { useMemoryWall } from '../context/MemoryWallContext.jsx'

const MESSAGE_MAX_LENGTH = 420

const CARD_PALETTE = [
  { bg: 'bg-amber-100', text: 'text-amber-950' },
  { bg: 'bg-blue-100', text: 'text-blue-950' },
  { bg: 'bg-green-100', text: 'text-green-950' },
  { bg: 'bg-pink-100', text: 'text-pink-950' },
  { bg: 'bg-purple-100', text: 'text-purple-950' },
]

function colorForNote(id) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0
  }
  return CARD_PALETTE[Math.abs(hash) % CARD_PALETTE.length]
}

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function NoteCard({ note }) {
  const { bg, text } = colorForNote(note.id)
  return (
    <div className={`rounded-lg p-4 ${bg} ${text}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{note.name}</span>
        <span className="shrink-0 text-sm text-yellow-600">
          {'★'.repeat(note.rating)}
          {'☆'.repeat(5 - note.rating)}
        </span>
      </div>
      <div className="mt-0.5 text-xs opacity-60">
        {formatTimestamp(note.timestamp)}
      </div>
      <p className="mt-2 text-sm">{note.message}</p>
    </div>
  )
}

function StarRatingInput({ rating, onChange }) {
  return (
    <div className="flex gap-1 text-xl">
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

function MemoryWallApp() {
  const { notes, addNote } = useMemoryWall()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [ratingFilter, setRatingFilter] = useState('all')

  const visibleNotes = notes
    .filter(
      (note) => ratingFilter === 'all' || note.rating === Number(ratingFilter),
    )
    .filter((note) => {
      const term = searchTerm.trim().toLowerCase()
      if (!term) return true
      return (
        note.name.toLowerCase().includes(term) ||
        note.message.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      const diff = new Date(a.timestamp) - new Date(b.timestamp)
      return sortOrder === 'newest' ? -diff : diff
    })

  function handlePost() {
    if (!name.trim() || !message.trim()) return
    addNote({
      id: `note-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      rating,
      timestamp: new Date().toISOString(),
    })
    setName('')
    setMessage('')
    setRating(0)
  }

  return (
    <div className="flex h-full flex-col text-white">
      <div className="border-b border-white/10 bg-[#12141a] p-5">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/90 text-xl">
              💬
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1 text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                <span>✨</span> Visitor Memories
              </div>
              <h2 className="text-xl font-semibold">
                Leave a mark on Sonny&apos;s Portfolio
              </h2>
              <p className="mt-1 max-w-md text-sm text-white/60">
                A shared wall for visitors, clients, friends, and curious
                explorers. Add a thought, a note, or a small reaction to become
                part of the portfolio experience.
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-xl bg-black/30 px-6 py-3 text-center">
            <div className="text-3xl font-bold">{notes.length}</div>
            <div className="text-xs text-white/50">Notes on the wall</div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 shrink-0 overflow-y-auto border-r border-white/10 p-4 text-sm">
          <h3 className="mb-1 font-semibold">Add your note</h3>
          <p className="mb-4 text-xs text-white/50">
            Leave a small piece of your visit inside Sonny&apos;s interactive
            portfolio.
          </p>
          <label className="mb-3 block">
            <span className="mb-1 block text-xs text-white/50">Your name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded bg-white px-3 py-2 text-sm text-black placeholder-black/40 focus:outline-none"
            />
          </label>
          <label className="mb-1 block">
            <span className="mb-1 block text-xs text-white/50">
              Your message
            </span>
            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))
              }
              placeholder="Write something thoughtful..."
              className="h-32 w-full resize-none rounded bg-white px-3 py-2 text-sm text-black placeholder-black/40 focus:outline-none"
            />
          </label>
          <div className="mb-3 text-right text-xs text-white/40">
            {message.length}/{MESSAGE_MAX_LENGTH}
          </div>
          <div className="mb-4">
            <span className="mb-1 block text-xs text-white/50">
              Experience rating
            </span>
            <StarRatingInput rating={rating} onChange={setRating} />
          </div>
          <button
            onClick={handlePost}
            disabled={!name.trim() || !message.trim()}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ➤ Post to the wall
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="flex-1 rounded bg-white px-3 py-2 text-sm text-black placeholder-black/40 focus:outline-none"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded bg-white px-2 py-2 text-sm text-black focus:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rounded bg-white px-2 py-2 text-sm text-black focus:outline-none"
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
              <option value="0">0 stars</option>
            </select>
          </div>
          {visibleNotes.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-white/40">
              No notes match
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {visibleNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemoryWallApp
