import { useState } from 'react'
import loginBackground from './assets/components/blog login ui.png'
import { AVATAR_COLORS } from './avatarColors.js'

function BlogNameGate({ onSubmit, onCancel, isLoading = false, children }) {
  const [name, setName] = useState('')
  const [avatarColor, setAvatarColor] = useState(null)
  const canContinue = name.trim().length > 0 && avatarColor !== null

  function handleSubmit(e) {
    e.preventDefault()
    if (!canContinue || isLoading) return
    onSubmit(name.trim(), avatarColor)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        className="relative w-full max-w-[1080px] overflow-hidden rounded-lg shadow-2xl"
        style={{ aspectRatio: '1080 / 500' }}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-[4%] right-[2%] z-20 h-[5%] w-[8%] cursor-pointer"
        />
        <form
          onSubmit={handleSubmit}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
            isLoading ? 'pointer-events-none opacity-30' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${loginBackground})` }}
        >
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            aria-label="Your name"
            disabled={isLoading}
            className="absolute top-[17.6%] left-[58.3%] h-[8%] w-[31.9%] rounded-lg border border-slate-300 bg-white text-center text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#1877F2] [font-size:clamp(10px,1.6vw,16px)]"
          />
          {AVATAR_COLORS.map((color, index) => {
            const row = Math.floor(index / 4)
            const col = index % 4
            const left = 59.7 + col * 7.9
            const top = row === 0 ? 38.9 : 50.1
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setAvatarColor(color.id)}
                aria-label={`Avatar color ${color.id}`}
                disabled={isLoading}
                className={`absolute h-[9%] w-[4.17%] cursor-pointer rounded-full ${
                  avatarColor === color.id
                    ? 'ring-2 ring-slate-900 ring-offset-2'
                    : ''
                }`}
                style={{ left: `${left}%`, top: `${top}%` }}
              />
            )
          })}
          <button
            type="submit"
            disabled={!canContinue || isLoading}
            aria-label="Login"
            className={`absolute top-[65.6%] left-[58.3%] h-[9%] w-[31.9%] rounded-full text-sm font-semibold text-white ${
              canContinue && !isLoading
                ? 'cursor-pointer bg-[#1877F2] hover:bg-[#1462cc]'
                : 'cursor-not-allowed bg-slate-300 text-slate-500'
            }`}
          >
            Login
          </button>
          {!canContinue && (
            <p className="absolute top-[75.5%] left-[58.3%] w-[31.9%] text-center text-xs text-slate-400">
              {name.trim().length === 0
                ? 'Enter your name to continue'
                : 'Pick an avatar to continue'}
            </p>
          )}
        </form>
        {children}
      </div>
    </div>
  )
}

export default BlogNameGate
