import { useState } from 'react'
import userIcon from './assets/icons/user icon.png'
import { AVATAR_COLORS } from './avatarColors.js'
import { BRAND_BLUE_BG, BRAND_BLUE_FOCUS_BORDER } from './theme.js'

function BlogNameGate({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [avatarColor, setAvatarColor] = useState(null)
  const canContinue = name.trim().length > 0 && avatarColor !== null

  function handleSubmit(e) {
    e.preventDefault()
    if (!canContinue) return
    onSubmit(name.trim(), avatarColor)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="mb-1 text-lg font-semibold text-slate-900">
          Join the Blog
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Pick a name and an avatar color to like and comment on posts.
        </p>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className={`mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ${BRAND_BLUE_FOCUS_BORDER}`}
        />
        <div className="mb-5 grid grid-cols-4 gap-2">
          {AVATAR_COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setAvatarColor(color.id)}
              aria-label={`Avatar color ${color.id}`}
              className={`flex h-12 w-12 items-center justify-center rounded-full ${color.bg} ${
                avatarColor === color.id
                  ? 'ring-2 ring-slate-900 ring-offset-2'
                  : ''
              }`}
            >
              <img src={userIcon} alt="" className="h-7 w-7" />
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canContinue}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300 ${BRAND_BLUE_BG}`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogNameGate
