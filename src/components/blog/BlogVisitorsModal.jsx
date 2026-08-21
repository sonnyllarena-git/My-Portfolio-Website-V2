import { useState } from 'react'
import searchIcon from './assets/icons/search icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'

function BlogVisitorsModal({ visitors, onClose }) {
  const [query, setQuery] = useState('')
  const filtered = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">
            All Visitors ({visitors.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
            <img src={searchIcon} alt="" className="h-4 w-4" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search all visitors"
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
            />
          </div>
        </div>
        <div className="scrollbar-light flex-1 overflow-y-auto px-4 pb-4">
          {filtered.length === 0 ? (
            <p className="text-xs text-slate-400">
              No visitors match your search.
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((visitor) => (
                <li
                  key={visitor.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${getAvatarColorClass(visitor.avatarColor)}`}
                  >
                    <img src={userIcon} alt="" className="h-4 w-4" />
                  </span>
                  <span className="text-slate-700">{visitor.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogVisitorsModal
