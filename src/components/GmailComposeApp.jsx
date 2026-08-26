import { useEffect, useRef, useState } from 'react'
import composeBg from './gmail/assets/gmail compose app.jpg'
import ZoomChatEmojiPicker from './zoomChat/ZoomChatEmojiPicker.jsx'

const CONTACT_EMAIL = 'llarenasonny@yahoo.com'
const CATEGORIES = [
  'Pricing',
  'Product Inquiry',
  'Software Development',
  'Web Development',
  'Other',
]

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

function GmailComposeApp({ guest, onLogout = () => {} }) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [category, setCategory] = useState('')
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

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#1a1c22] p-2">
      <div
        className="relative w-full bg-white bg-no-repeat text-[#202124]"
        style={{
          aspectRatio: '1695 / 857',
          containerType: 'inline-size',
          backgroundImage: `url(${composeBg})`,
          backgroundSize: '118.0% 123.2%',
          backgroundPosition: '49.84% 85.43%',
        }}
      >
        <button
          type="button"
          onClick={onLogout}
          className="absolute top-[2.9%] right-[2%] cursor-pointer font-medium text-[#1a73e8] hover:underline [font-size:max(8px,1.32cqw)]"
        >
          Logout
        </button>

        <div className="absolute top-0 left-[4%] flex h-[4.79%] items-center gap-1">
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 [font-size:max(8px,1.22cqw)]">
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

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          aria-label="Subject"
          className="absolute top-[4.79%] left-[1%] h-[5.01%] w-[45%] bg-white text-[#202124] outline-none placeholder:text-gray-500 [font-size:max(8px,1.32cqw)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Inquiry category"
          className="absolute top-[5.3%] left-[48%] h-[4%] w-[20%] cursor-pointer border border-gray-300 bg-white text-gray-600 [font-size:max(7px,1.12cqw)]"
        >
          <option value="">Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div
          ref={bodyRef}
          contentEditable
          suppressContentEditableWarning
          className="scrollbar-classic absolute top-[9.8%] left-[1%] h-[77.5%] w-[97%] overflow-auto text-gray-800 whitespace-pre-wrap outline-none [font-size:max(9px,1.42cqw)]"
        >
          {`\n\n—\n${guest?.name ?? ''} <${guest?.email ?? ''}>`}
        </div>

        <div className="absolute top-[87.4%] left-[1%] flex h-[4.8%] w-[75%] items-center gap-1">
          <div ref={emojiButtonRef} className="relative">
            <button
              type="button"
              onClick={() => setEmojiPickerOpen((open) => !open)}
              aria-label="Add emoji"
              title="Insert emoji — above the Send button"
              className="flex h-6 w-6 cursor-pointer items-center justify-center hover:bg-gray-100 [font-size:max(10px,1.52cqw)]"
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
            className="cursor-pointer border border-gray-300 bg-white text-gray-600 [font-size:max(7px,1.12cqw)]"
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
            className="cursor-pointer border border-gray-300 bg-white text-gray-600 [font-size:max(7px,1.12cqw)]"
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
            className="h-6 w-6 cursor-pointer border border-gray-300 p-0.5"
          />
          {MARK_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(btn.command)}
              aria-label={btn.label}
              title={btn.label}
              className={`flex h-6 w-6 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100 [font-size:max(8px,1.32cqw)] ${btn.className}`}
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
              className="flex h-6 w-6 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100"
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
              className="flex h-6 w-6 cursor-pointer items-center justify-center text-gray-600 hover:bg-gray-100 [font-size:max(8px,1.32cqw)]"
            >
              {btn.glyph}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSend}
          aria-label="Send"
          className="absolute top-[94.05%] left-[1%] h-[4.2%] w-[6.37%] cursor-pointer"
        />

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
    </div>
  )
}

export default GmailComposeApp
