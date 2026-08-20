import { useEffect, useRef, useState } from 'react'
import { arcadeBackgrounds } from '../../data/arcadeBackgrounds.js'

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
      className="absolute top-full right-0 z-20 mt-2 w-64 rounded-lg border border-white/10 bg-[#1a1a1a] p-3 text-sm text-white shadow-2xl"
    >
      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold text-white/50">
          Sound settings
        </p>
        <button
          type="button"
          onClick={() => setSoundMuted(!soundMuted)}
          className="flex w-full items-center justify-between rounded border border-white/10 px-2 py-1.5 hover:bg-white/10"
        >
          <span>Mute all sound</span>
          <span>{soundMuted ? '🔇 On' : '🔊 Off'}</span>
        </button>
      </div>

      <div className="mb-3">
        <p className="mb-1.5 text-xs font-semibold text-white/50">
          Background settings
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {arcadeBackgrounds.map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => setBackgroundId(bg.id)}
              className={`rounded border px-2 py-1 text-xs ${
                bg.id === backgroundId
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-white/10 text-white/70 hover:border-white/30'
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
            Sonny's Arcade — a small collection of games built into this
            portfolio. Scores, ratings, and settings are saved to this browser
            only.
          </p>
        )}
      </div>

      <div className="mb-3 border-t border-white/10 pt-3">
        <p className="mb-1.5 text-xs font-semibold text-white/50">
          Contact developer
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onOpenZoomChat}
            className="flex-1 rounded border border-white/10 px-2 py-1.5 text-xs hover:bg-white/10"
          >
            Zoom Chat
          </button>
          <button
            type="button"
            onClick={onOpenGmail}
            className="flex-1 rounded border border-white/10 px-2 py-1.5 text-xs hover:bg-white/10"
          >
            Gmail
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="w-full rounded bg-red-500/20 px-2 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30"
      >
        Logout
      </button>
    </div>
  )
}

export default GamesSettingsMenu
