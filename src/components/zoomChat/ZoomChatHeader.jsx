function ZoomChatHeader({ onClose }) {
  return (
    <div className="window-title-bar flex h-[75px] shrink-0 cursor-move items-center justify-between bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-4 text-white">
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-extrabold">SONNY</span>
        <span className="text-lg font-medium">Virtual Agent</span>
      </div>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex items-center gap-1"
      >
        <button
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-full text-xl hover:bg-white/20"
        >
          &hellip;
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-xl hover:bg-white/20"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default ZoomChatHeader
