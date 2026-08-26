function ZoomChatHeader({ onClose, onMinimize, onMaximize, isMaximized }) {
  return (
    <div className="window-title-bar flex h-[75px] shrink-0 cursor-move items-center justify-between bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 pl-4 text-white">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-extrabold">SONNY</span>
        <span className="text-lg font-medium">Virtual Agent</span>
      </div>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex h-full items-stretch"
      >
        <button
          onClick={onMinimize}
          aria-label="Minimize"
          className="flex h-full w-9 items-center justify-center text-xl hover:bg-white/20"
        >
          &minus;
        </button>
        <button
          onClick={onMaximize}
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
          className="flex h-full w-9 items-center justify-center text-sm hover:bg-white/20"
        >
          {isMaximized ? '❐' : '□'}
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-full w-9 items-center justify-center text-xl hover:bg-red-500/80"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default ZoomChatHeader
