function Window({ title, onClose }) {
  return (
    <div className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/10 bg-[#1a1c22] text-white shadow-2xl">
      <div className="flex items-center justify-between bg-[#25272e] px-3 py-2">
        <span className="text-sm font-medium">{title}</span>
        <button
          onClick={onClose}
          className="flex h-5 w-5 items-center justify-center rounded hover:bg-red-500/80"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="flex h-48 items-center justify-center text-sm text-white/40">
        Coming soon
      </div>
    </div>
  )
}

export default Window
