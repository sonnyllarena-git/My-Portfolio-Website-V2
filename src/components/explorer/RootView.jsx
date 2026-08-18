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
}) {
  const filteredFolders = folders.filter((item) =>
    matchesSearch(item.label, searchTerm),
  )
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
        {filteredFolders.map((item) => (
          <Tile
            key={item.label}
            isSelected={selectedTile === item.label}
            onSelect={() => onSelectTile(item.label)}
            onOpen={() => onOpenTile(item.label)}
            onContextMenu={(x, y) => onTileContextMenu(x, y, item.label)}
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
        ))}
      </div>
      {devices && (
        <>
          <div className="mt-4 mb-2 font-semibold">Devices and drives</div>
          <div className="grid grid-cols-2 gap-3">
            {filteredDrives.map((drive) => (
              <Tile
                key={drive.label}
                isSelected={selectedTile === drive.label}
                onSelect={() => onSelectTile(drive.label)}
                onOpen={() => onOpenTile(drive.label)}
                onContextMenu={(x, y) => onTileContextMenu(x, y, drive.label)}
                className="rounded-lg border border-white/10 p-3"
              >
                <div className="flex items-center gap-2">
                  <ItemIcon
                    id={drive.id}
                    icon="💽"
                    imgClassName="h-8 w-8"
                    textClassName="text-2xl"
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
              </Tile>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default RootView
