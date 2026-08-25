import { motion } from 'framer-motion'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { accentColors } from '../data/accentColors.js'
import SpeakerIcon from './icons/SpeakerIcon.jsx'

const panelMotion = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.96 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

function VolumeFlyout() {
  const { volume, setVolume, isMuted, setIsMuted, accentColor } =
    useSystemSettings()
  const accentHex = accentColors.find((c) => c.id === accentColor)?.hex
  const shownVolume = isMuted ? 0 : volume

  return (
    <motion.div
      {...panelMotion}
      style={{ transformOrigin: 'bottom right' }}
      className="absolute bottom-full right-0 w-72 border border-white/10 bg-[#1f1f1f]/95 p-4 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="text-sm text-white/70">Speakers</div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-white/10"
        >
          <SpeakerIcon className="h-5 w-5" muted={isMuted} />
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={shownVolume}
          onChange={(e) => {
            setIsMuted(false)
            setVolume(Number(e.target.value))
          }}
          style={{ accentColor: accentHex }}
          className="h-1 flex-1"
        />
        <span className="w-8 shrink-0 text-right text-sm">{shownVolume}</span>
      </div>
    </motion.div>
  )
}

export default VolumeFlyout
