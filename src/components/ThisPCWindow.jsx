import { iconImages } from '../assets/icons/index.js'
import Window from './Window.jsx'

const ribbonTabs = ['File', 'Home', 'Share', 'View']

const quickAccess = [
  { label: 'Desktop', icon: '🖥️', id: 'desktop' },
  { label: 'Downloads', icon: '⬇️', id: 'downloads' },
  { label: 'Documents', icon: '📄' },
  { label: 'Pictures', icon: '🖼️', id: 'pictures' },
  { label: 'Music', icon: '🎵', id: 'music' },
  { label: 'Videos', icon: '🎬', id: 'videos' },
]

const thisPcDrives = [
  { label: 'Local Disk (C:)', icon: '💽', id: 'local-disk-c' },
]

const drives = [
  { label: 'Local Disk (C:)', freeGb: 142, totalGb: 476, id: 'local-disk-c' },
  { label: 'System Reserved (D:)', freeGb: 2, totalGb: 15, id: 'local-disk-d' },
]

function ItemIcon({ id, icon, imgClassName, textClassName }) {
  return iconImages[id] ? (
    <img
      src={iconImages[id]}
      alt=""
      className={`${imgClassName} object-contain`}
    />
  ) : (
    <span className={textClassName}>{icon}</span>
  )
}

function driveUsedPercent(drive) {
  return Math.round(((drive.totalGb - drive.freeGb) / drive.totalGb) * 100)
}

function ThisPCWindow({ onClose, isMinimized, onMinimizeToggle }) {
  return (
    <Window
      icon="💻"
      title="This PC"
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      defaultWidth={700}
      defaultHeight={520}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#202225] px-2 py-1.5 text-white/80">
        <button aria-label="Back" className="rounded px-1 hover:bg-white/10">
          ←
        </button>
        <button aria-label="Forward" className="rounded px-1 hover:bg-white/10">
          →
        </button>
        <button aria-label="Refresh" className="rounded px-1 hover:bg-white/10">
          ⟳
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#2b2d31] px-3 py-1 text-xs">
          <span>🏠</span>
          <span>This PC &gt; Local Disk (C:)</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-32 rounded-full bg-[#2b2d31] px-3 py-1 text-xs placeholder-white/40 focus:outline-none"
        />
      </div>
      <div className="flex gap-4 border-b border-white/10 bg-[#1a1c22] px-3 text-xs text-white/70">
        {ribbonTabs.map((tab) => (
          <span
            key={tab}
            className="cursor-pointer border-b-2 border-transparent py-2 hover:text-white"
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="flex">
        <div className="w-36 shrink-0 border-r border-white/10 bg-[#1f2126] py-2 text-xs">
          <div className="px-3 py-1 text-white/50">Quick access</div>
          {quickAccess.map((item) => (
            <div
              key={item.label}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-white/10"
            >
              <ItemIcon id={item.id} icon={item.icon} imgClassName="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-2 px-3 py-1 text-white/50">This PC</div>
          {thisPcDrives.map((item) => (
            <div
              key={item.label}
              className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-white/10"
            >
              <ItemIcon id={item.id} icon={item.icon} imgClassName="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 text-xs text-white/80">
          <div className="mb-2 font-semibold">Folders</div>
          <div className="grid grid-cols-3 gap-3">
            {quickAccess.map((item) => (
              <div
                key={item.label}
                className="flex cursor-pointer flex-col items-center gap-1 rounded p-2 hover:bg-white/10"
              >
                <ItemIcon
                  id={item.id}
                  icon={item.icon}
                  imgClassName="h-6 w-6"
                  textClassName="text-xl"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 mb-2 font-semibold">Devices and drives</div>
          <div className="grid grid-cols-2 gap-3">
            {drives.map((drive) => (
              <div
                key={drive.label}
                className="rounded-lg border border-white/10 p-3"
              >
                <div className="flex items-center gap-2">
                  <ItemIcon
                    id={drive.id}
                    icon="💽"
                    imgClassName="h-6 w-6"
                    textClassName="text-lg"
                  />
                  <span className="font-medium">{drive.label}</span>
                </div>
                <div className="mt-1 text-white/60">
                  {drive.freeGb} GB free of {drive.totalGb} GB
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${driveUsedPercent(drive)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  )
}

export default ThisPCWindow
