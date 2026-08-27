import { quickAccess, thisPcDrives, drives } from '../data/thisPcLocations.js'
import ExplorerWindow from './explorer/ExplorerWindow.jsx'

function ThisPCWindow({
  onClose,
  isMinimized,
  onMinimizeToggle,
  onOpenNewWindow,
  cascadeOffset,
  zIndex,
  onFocus,
  onOpenApp,
}) {
  return (
    <ExplorerWindow
      icon="💻"
      title="This PC"
      defaultWidth={1200}
      defaultHeight={800}
      rootLabel="This PC"
      quickAccess={quickAccess}
      pcDrives={thisPcDrives}
      folders={quickAccess}
      devices={drives}
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      onOpenNewWindow={onOpenNewWindow}
      cascadeOffset={cascadeOffset}
      zIndex={zIndex}
      onFocus={onFocus}
      onOpenApp={onOpenApp}
    />
  )
}

export default ThisPCWindow
