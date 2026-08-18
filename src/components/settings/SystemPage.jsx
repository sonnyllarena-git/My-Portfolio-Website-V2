import { useSystemSettings } from '../../context/SystemSettingsContext.jsx'
import SpeakerIcon from '../icons/SpeakerIcon.jsx'
import SunIcon from '../icons/SunIcon.jsx'

function SliderRow({ Icon, title, description, value, onChange }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
      <div className="mb-3">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-white/50">{description}</div>
      </div>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-white/60" />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-12 text-right text-sm">{value}%</span>
      </div>
    </div>
  )
}

function SystemPage() {
  const { brightness, setBrightness, volume, setVolume } = useSystemSettings()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">System</h2>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/70 uppercase">
          Display
        </h3>
        <SliderRow
          Icon={SunIcon}
          title="Brightness"
          description="Adjust screen brightness"
          value={brightness}
          onChange={setBrightness}
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-white/70 uppercase">
          Sound
        </h3>
        <SliderRow
          Icon={SpeakerIcon}
          title="Volume"
          description="Adjust system volume"
          value={volume}
          onChange={setVolume}
        />
      </div>
    </div>
  )
}

export default SystemPage
