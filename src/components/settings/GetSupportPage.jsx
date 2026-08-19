import { iconImages } from '../../assets/icons/index.js'

function GetSupportPage({ onOpenGmail, onOpenZoomChat }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Get Support</h2>
      <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
        <div className="mb-2 font-semibold">Need help or have a question?</div>
        <p className="mb-4 text-sm text-white/60">
          Reach out directly and Sonny will get back to you.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onOpenGmail}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
          >
            <img src={iconImages.gmail} alt="" className="h-5 w-5" />
            Contact Support via Email
          </button>
          <button
            onClick={onOpenZoomChat}
            className="flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
          >
            <img src={iconImages['zoom-chat']} alt="" className="h-5 w-5" />
            Chat with Zoom Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetSupportPage
