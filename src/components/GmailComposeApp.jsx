import { useRef, useState } from 'react'

const CONTACT_EMAIL = 'llarenasonny@yahoo.com'
const CATEGORIES = [
  'Pricing',
  'Product Inquiry',
  'Software Development',
  'Web Development',
  'Other',
]

const TOOLBAR = [
  { command: 'bold', label: 'Bold', glyph: 'B', className: 'font-bold' },
  { command: 'italic', label: 'Italic', glyph: 'I', className: 'italic' },
  {
    command: 'underline',
    label: 'Underline',
    glyph: 'U',
    className: 'underline',
  },
  {
    command: 'strikeThrough',
    label: 'Strikethrough',
    glyph: 'S',
    className: 'line-through',
  },
  { command: 'insertUnorderedList', label: 'Bulleted list', glyph: '•≡' },
  { command: 'insertOrderedList', label: 'Numbered list', glyph: '1≡' },
  { command: 'outdent', label: 'Decrease indent', glyph: '⇤' },
  { command: 'indent', label: 'Increase indent', glyph: '⇥' },
  {
    command: 'formatBlock',
    value: 'blockquote',
    label: 'Quote',
    glyph: '❝',
  },
  { command: 'removeFormat', label: 'Clear formatting', glyph: '⌫' },
]

function GmailComposeApp({ guest }) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const bodyRef = useRef(null)

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

  function handleSend() {
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <div className="relative flex h-full flex-col bg-white text-sm text-[#202124]">
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2">
        <span className="text-gray-500">To</span>
        <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5">
          {CONTACT_EMAIL}
          <button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="ml-1 text-gray-400 hover:text-gray-700"
          >
            ⧉
          </button>
        </span>
        <span className="ml-auto text-gray-400">Cc Bcc</span>
      </div>
      <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-2">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="flex-1 outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Inquiry category"
          className="rounded border border-gray-300 px-1.5 py-0.5 text-xs text-gray-600"
        >
          <option value="">Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={bodyRef}
        contentEditable
        suppressContentEditableWarning
        className="flex-1 overflow-auto px-4 py-3 text-gray-800 whitespace-pre-wrap outline-none"
      >
        {`\n\n—\n${guest?.name ?? ''} <${guest?.email ?? ''}>`}
      </div>
      <div className="flex items-center gap-0.5 border-t border-gray-200 px-4 py-1.5">
        {TOOLBAR.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec(btn.command, btn.value)}
            aria-label={btn.label}
            title={btn.label}
            className={`flex h-7 w-7 items-center justify-center rounded text-sm text-gray-600 hover:bg-gray-100 ${btn.className ?? ''}`}
          >
            {btn.glyph}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2">
        <button
          onClick={handleSend}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Send
        </button>
        <div className="flex gap-3 text-gray-500">
          <span>📎</span>
          <span>🔗</span>
          <span>🙂</span>
          <span>🖼️</span>
          <span>🔒</span>
        </div>
      </div>
      {copied && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
          Copied to clipboard!
        </div>
      )}
      {sent && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
          Message sent (demo) — real sending is coming soon
        </div>
      )}
    </div>
  )
}

export default GmailComposeApp
