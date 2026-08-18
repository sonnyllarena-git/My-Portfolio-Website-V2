import HomeIcon from '../icons/HomeIcon.jsx'
import LibraryIcon from '../icons/LibraryIcon.jsx'

function MusicLabSidebar({
  activeType,
  onSelectType,
  items,
  selectedItemId,
  onSelectItem,
}) {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-4 border-r border-white/10 bg-[#12141a] p-4 text-white">
      <button className="flex items-center gap-3 rounded px-1 py-1 text-left hover:bg-white/5">
        <HomeIcon className="h-5 w-5" />
        <span className="text-sm font-semibold">Home</span>
      </button>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-1 text-white/70">
          <LibraryIcon className="h-5 w-5" />
          <span className="text-sm font-semibold">Your Library</span>
        </div>
        <div className="flex gap-2 px-1">
          <button
            onClick={() => onSelectType('music')}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              activeType === 'music'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Music
          </button>
          <button
            onClick={() => onSelectType('video')}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              activeType === 'video'
                ? 'bg-white text-black'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Video
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className={`flex items-center gap-3 rounded px-2 py-2 text-left ${
              selectedItemId === item.id ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/10 text-lg">
              {activeType === 'video' ? '🎬' : '🎵'}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{item.title}</div>
              <div className="truncate text-xs text-white/50">
                {item.subtitle ?? item.artist}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default MusicLabSidebar
