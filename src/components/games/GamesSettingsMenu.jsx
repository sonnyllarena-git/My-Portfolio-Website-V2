import { useEffect, useRef, useState } from 'react'
import { arcadeBackgrounds } from '../../data/arcadeBackgrounds.js'
import { iconImages } from '../../assets/icons/index.js'

function SoundToggle({ soundMuted, setSoundMuted }) {
  return (
    <button
      type="button"
      onClick={() => setSoundMuted(!soundMuted)}
      className="flex w-full items-center justify-between rounded-xl border border-slate-700/60 px-2 py-1.5 hover:bg-white/10"
    >
      <span>Sound</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          soundMuted ? 'bg-white/10' : 'bg-cyan-500'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full transition-transform ${
            soundMuted ? 'translate-x-0 bg-red-500' : 'translate-x-4 bg-white'
          }`}
        />
      </span>
    </button>
  )
}

function GamesSettingsMenu({
  soundMuted,
  setSoundMuted,
  backgroundId,
  setBackgroundId,
  onLogout,
  onOpenZoomChat,
  onOpenGmail,
  onClose,
}) {
  const menuRef = useRef(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    function handleOutsideMouseDown(e) {
      if (!menuRef.current?.contains(e.target)) onClose()
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-50 mt-2 w-64 rounded-2xl border border-slate-700/60 bg-slate-900/95 p-3 text-sm text-white shadow-2xl backdrop-blur-md"
    >
      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
          Sound settings
        </p>
        <SoundToggle soundMuted={soundMuted} setSoundMuted={setSoundMuted} />
      </div>

      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold tracking-wide text-white/50 uppercase">
          Themes
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {arcadeBackgrounds.map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => setBackgroundId(bg.id)}
              className={`rounded-xl border px-2 py-1 text-xs ${
                bg.id === backgroundId
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-slate-700/60 text-white/70 hover:border-white/30'
              }`}
            >
              {bg.id === backgroundId ? '✓ ' : ''}
              {bg.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => setAboutOpen((prev) => !prev)}
          className="w-full text-left text-xs font-semibold text-white/50 hover:text-white/80"
        >
          About {aboutOpen ? '▾' : '▸'}
        </button>
        {aboutOpen && (
          <p className="mt-1.5 text-xs text-white/60">
            Explore a suite of custom-engineered web experiences designed,
            developed, and deployed independently by Sonny. Featuring optimized
            state management, real-time leaderboard tracking, and lightweight
            frontend architecture.
          </p>
        )}
      </div>

      <div className="mb-3 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => setContactOpen((prev) => !prev)}
          className="w-full text-left text-xs font-semibold text-white/50 hover:text-white/80"
        >
          Contact developer {contactOpen ? '▾' : '▸'}
        </button>
        {contactOpen && (
          <div className="mt-1.5 flex gap-1.5">
            <button
              type="button"
              onClick={onOpenZoomChat}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 px-2 py-1.5 text-xs hover:bg-white/10"
            >
              <img src={iconImages['zoom-chat']} alt="" className="h-4 w-4" />
              Zoom Chat
            </button>
            <button
              type="button"
              onClick={onOpenGmail}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 px-2 py-1.5 text-xs hover:bg-white/10"
            >
              <img src={iconImages.gmail} alt="" className="h-4 w-4" />
              Gmail
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="w-full rounded-xl bg-red-500/20 px-2 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30"
      >
        Logout
      </button>
    </div>
  )
}

export default GamesSettingsMenu
