import { useEffect, useRef, useState } from 'react'
import ZoomChatEmojiPicker from './zoomChat/ZoomChatEmojiPicker.jsx'

const CONTACT_EMAIL = 'llarenasonny@yahoo.com'

const FONT_FAMILIES = [
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
]

const FONT_SIZES = [
  { label: 'Small', value: '2' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '5' },
  { label: 'Huge', value: '7' },
]

const MARK_BUTTONS = [
  { command: 'bold', label: 'Bold', glyph: 'B', className: 'font-bold' },
  { command: 'italic', label: 'Italic', glyph: 'I', className: 'italic' },
  {
    command: 'underline',
    label: 'Underline',
    glyph: 'U',
    className: 'underline',
  },
]

const LIST_BUTTONS = [
  { command: 'insertUnorderedList', label: 'Bulleted list', glyph: '•≡' },
  { command: 'insertOrderedList', label: 'Numbered list', glyph: '1≡' },
]

function AlignLeftIcon() {
  return (
    <svg viewBox="0 0 18 14" width="14" height="12" aria-hidden="true">
      <rect x="0" y="1" width="18" height="2" fill="currentColor" />
      <rect x="0" y="6" width="12" height="2" fill="currentColor" />
      <rect x="0" y="11" width="15" height="2" fill="currentColor" />
    </svg>
  )
}

function AlignCenterIcon() {
  return (
    <svg viewBox="0 0 18 14" width="14" height="12" aria-hidden="true">
      <rect x="0" y="1" width="18" height="2" fill="currentColor" />
      <rect x="3" y="6" width="12" height="2" fill="currentColor" />
      <rect x="1.5" y="11" width="15" height="2" fill="currentColor" />
    </svg>
  )
}

function AlignRightIcon() {
  return (
    <svg viewBox="0 0 18 14" width="14" height="12" aria-hidden="true">
      <rect x="0" y="1" width="18" height="2" fill="currentColor" />
      <rect x="6" y="6" width="12" height="2" fill="currentColor" />
      <rect x="3" y="11" width="15" height="2" fill="currentColor" />
    </svg>
  )
}

const ALIGN_BUTTONS = [
  { command: 'justifyLeft', label: 'Align left', Icon: AlignLeftIcon },
  { command: 'justifyCenter', label: 'Align center', Icon: AlignCenterIcon },
  { command: 'justifyRight', label: 'Align right', Icon: AlignRightIcon },
]

function signatureBody(guest) {
  return `\n\n—\n${guest?.name ?? ''} <${guest?.email ?? ''}>`
}

function GmailComposeApp({ guest, onLogout = () => {} }) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState('')
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const bodyRef = useRef(null)
  const emojiButtonRef = useRef(null)

  useEffect(() => {
    if (!emojiPickerOpen) return
    function handleClickOutside(e) {
      if (!emojiButtonRef.current?.contains(e.target)) {
        setEmojiPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [emojiPickerOpen])

  function handleCopy() {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function exec(command, value) {
    bodyRef.current?.focus()
    document.execCommand(command, false, value)
  }

  function handleEmojiSelect(emoji) {
    exec('insertText', emoji)
    setEmojiPickerOpen(false)
  }

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  function handleDiscard() {
    setSubject('')
    if (bodyRef.current) bodyRef.current.textContent = signatureBody(guest)
  }

  return (
    <div className="@container relative flex h-full w-full flex-col overflow-auto bg-white text-[#202124]">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
        <span className="text-sm font-medium text-gray-800">
          © 2026 Sonny. All rights reserved. For commercial partnerships,
          technical consultations, or business inquiries, contact Sonny.
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="cursor-pointer text-sm font-medium text-[#1a73e8] hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-100 px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">To</span>
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {CONTACT_EMAIL}
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email address"
              className="cursor-pointer text-gray-400 hover:text-gray-700"
            >
              ⧉
            </button>
          </span>
        </div>
        <span className="text-xs text-gray-400">Cc Bcc</span>
      </div>

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        aria-label="Subject"
        className="shrink-0 border-b border-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-500"
      />

      <div
        ref={bodyRef}
        contentEditable
        suppressContentEditableWarning
        className="scrollbar-classic min-h-[120px] flex-1 overflow-auto px-4 py-3 text-sm whitespace-pre-wrap text-gray-800 outline-none"
      >
        {signatureBody(guest)}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1 border-t border-gray-100 px-3 py-2">
        <div ref={emojiButtonRef} className="relative">
          <button
            type="button"
            onClick={() => setEmojiPickerOpen((open) => !open)}
            aria-label="Add emoji"
            title="Insert emoji"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
          >
            🙂
          </button>
          {emojiPickerOpen && (
            <ZoomChatEmojiPicker onSelect={handleEmojiSelect} />
          )}
        </div>
        <select
          onChange={(e) => exec('fontName', e.target.value)}
          defaultValue=""
          aria-label="Font family"
          className="cursor-pointer rounded border border-gray-300 bg-white px-1 py-1 text-xs text-gray-600"
        >
          <option value="" disabled>
            Font
          </option>
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => exec('fontSize', e.target.value)}
          defaultValue="3"
          aria-label="Font size"
          className="cursor-pointer rounded border border-gray-300 bg-white px-1 py-1 text-xs text-gray-600"
        >
          {FONT_SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <input
          type="color"
          onChange={(e) => exec('foreColor', e.target.value)}
          aria-label="Text color"
          defaultValue="#000000"
          className="h-7 w-7 cursor-pointer rounded border border-gray-300 p-0.5"
        />
        {MARK_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec(btn.command)}
            aria-label={btn.label}
            title={btn.label}
            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100 ${btn.className}`}
          >
            {btn.glyph}
          </button>
        ))}
        {ALIGN_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec(btn.command)}
            aria-label={btn.label}
            title={btn.label}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-gray-600 hover:bg-gray-100"
          >
            <btn.Icon />
          </button>
        ))}
        {LIST_BUTTONS.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec(btn.command)}
            aria-label={btn.label}
            title={btn.label}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100"
          >
            {btn.glyph}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center justify-between px-3 pb-3">
        <div className="flex overflow-hidden rounded-full shadow-sm">
          <button
            type="button"
            onClick={handleSend}
            className="cursor-pointer bg-[#1a73e8] px-6 py-2.5 text-sm font-medium text-white hover:shadow-md"
          >
            Send
          </button>
          <span
            aria-hidden="true"
            className="flex items-center justify-center border-l border-white/20 bg-[#1a73e8] px-3 text-xs text-white"
          >
            ▾
          </span>
        </div>
        <button
          type="button"
          onClick={handleDiscard}
          aria-label="Discard draft"
          title="Discard draft"
          className="cursor-pointer text-gray-500 hover:text-gray-700"
        >
          🗑
        </button>
      </div>

      {copied && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
          Copied to clipboard!
        </div>
      )}
      {sent && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
          Message sent (demo) — real sending is coming soon
        </div>
      )}
    </div>
  )
}

export default GmailComposeApp
