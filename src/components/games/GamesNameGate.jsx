import { useState } from 'react'
import loginBackground from '../../assets/login ui/games login ui.png'

function GamesNameGate({ onSubmit, onCancel, isLoading = false, children }) {
  const [name, setName] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const canContinue = name.trim().length > 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!canContinue || isLoading) return
    onSubmit(name.trim())
  }

  return (
    <>
      {isMinimized && (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-16 left-4 z-50 rounded-full bg-[#2b2b2b] px-4 py-2 text-sm font-medium text-amber-200 shadow-2xl ring-1 ring-amber-900/50 hover:bg-[#3a3a3a]"
        >
          World of Sonny — Login
        </button>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity ${
          isMinimized ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="neon-border-orange relative w-full max-w-[640px] overflow-hidden rounded-lg"
          style={{ aspectRatio: '1024 / 629' }}
        >
          <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-1 sm:right-2.5 sm:top-2.5">
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize"
              className="flex h-6 w-6 items-center justify-center rounded text-base leading-none text-white/70 hover:bg-white/10 hover:text-white sm:h-7 sm:w-7"
            >
              −
            </button>
            <button
              type="button"
              onClick={onCancel}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center rounded text-base leading-none text-white/70 hover:bg-red-500/80 hover:text-white sm:h-7 sm:w-7"
            >
              ×
            </button>
          </div>
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
              placeholder="Your name"
              aria-label="Your name"
              disabled={isLoading}
              className="absolute left-[38.5%] top-[55%] h-[5.4%] w-[23%] rounded-sm border-none bg-transparent text-center font-semibold text-amber-100 outline-none placeholder:text-amber-100/40 [font-size:clamp(9px,2.1vw,15px)]"
            />
            <button
              type="submit"
              disabled={!canContinue || isLoading}
              aria-label="Log in"
              className={`absolute left-[39%] top-[73%] h-[11%] w-[32%] rounded-full transition ${
                canContinue && !isLoading
                  ? 'hover:shadow-[0_0_18px_6px_rgba(255,170,60,0.55)]'
                  : 'cursor-not-allowed bg-black/45'
              }`}
            />
          </form>
          {children}
        </div>
      </div>
    </>
  )
}

export default GamesNameGate
