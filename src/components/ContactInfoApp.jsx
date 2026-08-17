import { useState } from 'react'
import { contactInfo, buildContactText } from '../data/contactInfo.js'

const documentText = buildContactText(contactInfo)
const lineCount = documentText.split('\n').length
const wordCount = documentText.split(/\s+/).filter(Boolean).length
const charCount = documentText.length
const linkCount =
  contactInfo.fields.filter((f) => f.isLink).length +
  contactInfo.profiles.length
const readMinutes = Math.max(1, Math.round(wordCount / 200))

const menuItems = ['File', 'Edit', 'Format', 'View', 'Help']

function ContactRow({ label, value, isLink, editable }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 border-b border-white/10 py-3">
      <div className="text-xs font-semibold tracking-wide text-white/50 uppercase">
        {label}
      </div>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline"
        >
          {value}
        </a>
      ) : (
        <div contentEditable={editable} suppressContentEditableWarning>
          {value}
        </div>
      )}
    </div>
  )
}

function ContactInfoApp() {
  const [mode, setMode] = useState('read')
  const [showToast, setShowToast] = useState(false)

  function handleCopyAll() {
    navigator.clipboard.writeText(documentText).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    })
  }

  return (
    <div className="relative flex h-full flex-col text-sm text-white">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#202225] px-3 py-1.5">
        <div className="flex gap-4 text-white/70">
          {menuItems.map((item) => (
            <span key={item} className="cursor-pointer hover:text-white">
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setMode('read')}
            className={`rounded px-2 py-1 text-xs ${mode === 'read' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
          >
            Read
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`rounded px-2 py-1 text-xs ${mode === 'edit' ? 'bg-blue-500' : 'hover:bg-white/10'}`}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1c22] px-3 py-2">
        <button
          onClick={handleCopyAll}
          className="rounded bg-blue-500 px-2 py-1 text-xs hover:bg-blue-600"
        >
          Copy All Details
        </button>
        <input
          type="text"
          placeholder="Find in document"
          className="w-56 rounded bg-[#2b2d31] px-2 py-1 text-xs placeholder-white/40 focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-auto bg-[#0d0e11] p-6">
        <div className="mb-4 border-b border-white/10 pb-3 text-sm font-semibold">
          {contactInfo.headline}
        </div>
        {contactInfo.fields.map((field) => (
          <ContactRow key={field.label} {...field} editable={mode === 'edit'} />
        ))}
        <div className="mt-6 mb-1 text-sm font-semibold">Official Profiles</div>
        {contactInfo.profiles.map((profile) => (
          <ContactRow
            key={profile.label}
            label={profile.label}
            value={profile.url}
            isLink
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 bg-[#202225] px-3 py-1.5 text-xs text-white/60">
        <span>
          {lineCount} lines · {wordCount} words · {charCount} characters ·{' '}
          {linkCount} links · {readMinutes} min read
        </span>
        <span>
          Source synced · {mode === 'read' ? 'Read view' : 'Edit view'}
        </span>
      </div>
      {showToast && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default ContactInfoApp
