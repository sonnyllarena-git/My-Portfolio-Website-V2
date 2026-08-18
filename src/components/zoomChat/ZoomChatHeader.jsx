import zoomAvatar from '../../assets/icons/zoom-avatar.png'

function ZoomChatHeader({ onClose }) {
  return (
    <div className="flex shrink-0 items-center justify-between bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-4 py-3 text-white">
      <div className="flex items-center gap-3">
        <img
          src={zoomAvatar}
          alt=""
          className="h-9 w-9 rounded-full bg-white/20 p-1"
        />
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-extrabold">SONNY</span>
          <span className="text-lg font-medium">Virtual Agent</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
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
