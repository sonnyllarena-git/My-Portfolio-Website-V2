import Window from '../Window.jsx'
import ExplorerBody from './ExplorerBody.jsx'

function ExplorerWindow({
  icon,
  title,
  defaultWidth,
  defaultHeight,
  rootLabel,
  quickAccess,
  pcDrives,
  folders,
  devices,
  onClose,
  isMinimized,
  onMinimizeToggle,
  onOpenNewWindow,
  cascadeOffset,
  zIndex,
  onFocus,
}) {
  return (
    <Window
      icon={icon}
      title={title}
      onClose={onClose}
      isMinimized={isMinimized}
      onMinimizeToggle={onMinimizeToggle}
      defaultWidth={defaultWidth}
      defaultHeight={defaultHeight}
      cascadeOffset={cascadeOffset}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <ExplorerBody
        rootLabel={rootLabel}
        quickAccess={quickAccess}
        pcDrives={pcDrives}
        folders={folders}
        devices={devices}
        onOpenNewWindow={onOpenNewWindow}
        onClose={onClose}
      />
    </Window>
  )
}

export default ExplorerWindow
