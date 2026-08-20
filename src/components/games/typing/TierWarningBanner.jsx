import { useEffect } from 'react'

const DISMISS_MS = 2500

export default function TierWarningBanner({ text, onDismiss }) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, DISMISS_MS)
    return () => clearTimeout(timeout)
  }, [onDismiss])

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-2xl border-4 border-amber-500 bg-slate-900 px-8 py-6 text-center shadow-2xl">
        <p className="text-2xl font-black text-amber-400">{text}</p>
      </div>
    </div>
  )
}
