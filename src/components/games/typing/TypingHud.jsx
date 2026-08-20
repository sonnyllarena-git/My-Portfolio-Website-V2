export default function TypingHud({ level, secondsLeft }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2 rounded-full border-2 border-orange-700 bg-gradient-to-b from-orange-500 to-orange-700 px-4 py-1.5 shadow-lg">
        <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
          Level {level}
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full border-2 border-sky-800 bg-white px-3 py-1.5 shadow-lg">
        <span aria-hidden="true">⏱️</span>
        <span className="font-mono text-sm font-bold text-sky-900">
          {secondsLeft}s
        </span>
      </div>
    </div>
  )
}
