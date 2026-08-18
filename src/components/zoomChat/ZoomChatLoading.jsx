import zoomAvatar from '../../assets/icons/zoom-avatar.png'

function ZoomChatLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <img
        src={zoomAvatar}
        alt=""
        className="h-12 w-12 rounded-full bg-white/20 p-2"
      />
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      <p className="text-sm font-medium">
        Connecting to Sonny's Virtual Agent...
      </p>
    </div>
  )
}

export default ZoomChatLoading
