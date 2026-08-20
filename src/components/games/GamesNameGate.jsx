import { useState } from 'react'

function GamesNameGate({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const canContinue = name.trim().length > 0

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-80 rounded-lg border border-white/10 bg-[#2b2b2b] p-5 text-white shadow-2xl">
        <h2 className="text-sm font-semibold">Login to the Arcade</h2>
        <p className="mt-1 text-xs text-white/60">
          Let us know who's topping the leaderboard.
        </p>
        <label className="mt-4 block text-xs text-white/70">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded bg-white/10 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </label>
        <div className="mt-5 flex justify-end gap-2 text-sm">
          <button
            onClick={onCancel}
            className="rounded px-3 py-1.5 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            disabled={!canContinue}
            onClick={() => onSubmit(name.trim())}
            className="rounded bg-cyan-500 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamesNameGate
