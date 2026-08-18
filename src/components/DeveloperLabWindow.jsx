import {
  quickAccess,
  pcDrives,
  folders,
} from '../data/developerLabLocations.js'
import ExplorerWindow from './explorer/ExplorerWindow.jsx'

function DeveloperLabWindow({
  onClose,
  isMinimized,
  onMinimizeToggle,
  onOpenNewWindow,
  cascadeOffset,
}) {
  return (
    <ExplorerWindow
      icon="🛠️"
      title="Developer Lab"
      defaultWidth={700}
      defaultHeight={520}
      rootLabel="Developer Lab"
      quickAccess={quickAccess}
      pcDrives={pcDrives}
      folders={folders}
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      onOpenNewWindow={onOpenNewWindow}
      cascadeOffset={cascadeOffset}
    />
  )
}

export default DeveloperLabWindow
