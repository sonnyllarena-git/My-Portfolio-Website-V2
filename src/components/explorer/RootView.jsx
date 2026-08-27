import { useState } from 'react'
import ItemIcon from './ItemIcon.jsx'
import Tile from './Tile.jsx'

function driveUsedPercent(drive) {
  return Math.round(((drive.totalGb - drive.freeGb) / drive.totalGb) * 100)
}

function matchesSearch(label, searchTerm) {
  return label.toLowerCase().includes(searchTerm.trim().toLowerCase())
}

function RootView({
  folders,
  devices,
  selectedTile,
  onSelectTile,
  onOpenTile,
  onTileContextMenu,
  searchTerm = '',
  isMobile = false,
}) {
  const [devicesExpanded, setDevicesExpanded] = useState(true)
  const filteredFolders = searchTerm.trim()
    ? folders.filter(
        (item) =>
          item.type !== 'divider' && matchesSearch(item.label, searchTerm),
      )
    : folders
  const filteredDrives = (devices ?? []).filter((drive) =>
    matchesSearch(drive.label, searchTerm),
  )

  if (searchTerm.trim() && !filteredFolders.length && !filteredDrives.length) {
    return (
      <div className="flex h-full items-center justify-center text-white/40">
        No results
      </div>
    )
  }

  return (
    <>
      <div className="mb-2 font-semibold">Folders</div>
      <div className="grid grid-cols-3 gap-3">
        {filteredFolders.map((item, index) =>
          item.type === 'divider' ? (
            <div
              key={`divider-${index}`}
              className="col-span-3 my-1 border-t border-white/10"
            />
          ) : (
            <Tile
              key={item.label}
              isSelected={selectedTile === item.label}
              onSelect={() => onSelectTile(item.label)}
              onOpen={() => onOpenTile(item)}
              onContextMenu={(x, y) => onTileContextMenu(x, y, item)}
              isMobile={isMobile}
              className="flex cursor-pointer flex-col items-center gap-1 rounded p-2"
            >
              <ItemIcon
                id={item.id}
                icon={item.icon}
                imgClassName="h-8 w-8"
                textClassName="text-2xl"
              />
              <span>{item.label}</span>
            </Tile>
          ),
        )}
      </div>
      {devices && (
        <>
          <div className="mt-4 mb-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDevicesExpanded((prev) => !prev)}
              className="flex shrink-0 items-center gap-1.5 font-semibold"
            >
              <span className="text-[10px] text-white/60">
                {devicesExpanded ? '⌄' : '›'}
              </span>
              Devices and drives ({filteredDrives.length})
            </button>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          {devicesExpanded && (
            <div className="grid grid-cols-2 gap-3">
              {filteredDrives.map((drive) => (
                <Tile
                  key={drive.label}
                  isSelected={selectedTile === drive.label}
                  onSelect={() => onSelectTile(drive.label)}
                  onOpen={() => onOpenTile(drive)}
                  onContextMenu={(x, y) => onTileContextMenu(x, y, drive)}
                  isMobile={isMobile}
                  className="flex items-center gap-3 rounded-lg border border-white/10 p-3"
                >
                  <ItemIcon
                    id={drive.id}
                    icon="💽"
                    imgClassName="h-9 w-9"
                    textClassName="text-3xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{drive.label}</div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${driveUsedPercent(drive)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-white/60">
                      {drive.freeGb} GB free of {drive.totalGb} GB
                    </div>
                  </div>
                </Tile>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default RootView
