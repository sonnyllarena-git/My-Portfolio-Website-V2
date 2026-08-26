import { useState } from 'react'

export function ContactCardBody({ icon, onClose }) {
  const [copied, setCopied] = useState(false)
  const isUrl = icon.href.startsWith('http')

  function handleCopy() {
    navigator.clipboard.writeText(icon.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h2 className="text-sm font-semibold">{icon.label}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-7 w-7 items-center justify-center rounded-full text-lg text-white/60 hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <div className="text-xs font-semibold tracking-wide text-white/40 uppercase">
            Link
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="flex-1 truncate text-sm text-cyan-300">
              {icon.href}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded px-2 py-1 text-xs text-white/60 hover:bg-white/10 hover:text-white"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          {isUrl && (
            <a
              href={icon.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block w-full rounded bg-cyan-500 px-3 py-1.5 text-center text-sm font-medium text-black transition hover:bg-cyan-400 active:scale-95"
            >
              Open ↗
            </a>
          )}
        </div>
        {icon.stat && (
          <div className="rounded border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-semibold tracking-wide text-white/40 uppercase">
              {icon.stat.label}
            </div>
            <div className="mt-1 text-lg font-semibold">{icon.stat.value}</div>
            {icon.stat.isPlaceholder && (
              <div className="mt-1 text-[11px] text-white/40">
                Placeholder — illustrative only, not real data.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

function ContactProfileModal({ icon, onClose }) {
  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-lg border border-white/10 bg-[#0d0e11] text-white shadow-2xl"
      >
        <ContactCardBody icon={icon} onClose={onClose} />
      </div>
    </div>
  )
}

export default ContactProfileModal
