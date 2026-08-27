import {
  quickAccess,
  pcDrives,
  folders,
  drives,
} from '../data/developerLabLocations.js'
import ExplorerWindow from './explorer/ExplorerWindow.jsx'

function DeveloperLabWindow({
  onClose,
  isMinimized,
  onMinimizeToggle,
  onOpenNewWindow,
  onOpenProjects,
  onOpenApp,
  cascadeOffset,
  zIndex,
  onFocus,
}) {
  return (
    <ExplorerWindow
      icon="🛠️"
      title="Developer Lab"
      defaultWidth={1200}
      defaultHeight={800}
      rootLabel="Developer Lab"
      quickAccess={quickAccess}
      pcDrives={pcDrives}
      folders={folders}
      devices={drives}
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      onOpenNewWindow={onOpenNewWindow}
      cascadeOffset={cascadeOffset}
      zIndex={zIndex}
      onFocus={onFocus}
      onOpenApp={(appId) =>
        appId === 'projects-compilation' ? onOpenProjects() : onOpenApp(appId)
      }
    />
  )
}

export default DeveloperLabWindow
