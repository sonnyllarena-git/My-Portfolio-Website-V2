import { useState } from 'react'

function GmailGuestGate({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const canContinue = name.trim().length > 0 && email.trim().includes('@')

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="w-80 max-w-[90vw] rounded-lg border border-white/10 bg-[#2b2b2b] p-5 text-white shadow-2xl">
        <h2 className="text-sm font-semibold">Before you compose...</h2>
        <p className="mt-1 text-xs text-white/60">
          Let Sonny know who's reaching out.
        </p>
        <label className="mt-4 block text-xs text-white/70">
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded bg-white/10 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </label>
        <label className="mt-3 block text-xs text-white/70">
          Your email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={() => onSubmit({ name: name.trim(), email: email.trim() })}
            className="rounded bg-cyan-500 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default GmailGuestGate
