function ResumeWindow({ onClose }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/10 bg-[#2b2b2b] shadow-2xl">
      <div className="flex items-center justify-between bg-[#b30b00] px-3 py-2 text-white">
        <span className="text-sm font-medium">Resume.pdf</span>
        <button
          onClick={onClose}
          className="flex h-5 w-5 items-center justify-center rounded hover:bg-black/30"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="flex items-center justify-between bg-[#3c3c3c] px-3 py-1 text-xs text-white/70">
        <span>Page 1 of 1</span>
        <span>100%</span>
      </div>
      <div className="flex justify-center bg-[#525659] p-6">
        <div className="h-80 w-64 space-y-3 rounded-sm bg-white p-4 shadow-lg">
          <div className="h-4 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
          <div className="mt-4 h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-200" />
          <div className="h-2 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default ResumeWindow
