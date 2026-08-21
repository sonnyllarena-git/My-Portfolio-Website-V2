import { useState } from 'react'
import { useBlog } from '../../context/BlogContext.jsx'
import searchIcon from './assets/icons/search icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'
import BlogVisitorsModal from './BlogVisitorsModal.jsx'

const VISIBLE_LIMIT = 20

function BlogVisitorsPanel() {
  const { getAllVisitors } = useBlog()
  const visitors = getAllVisitors()
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filtered = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  const visible = filtered.slice(0, VISIBLE_LIMIT)

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Visitors</h3>
      <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
        <img src={searchIcon} alt="" className="h-4 w-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search visitors"
          className="w-full bg-transparent text-sm text-slate-900 outline-none"
        />
      </div>
      {visible.length === 0 ? (
        <p className="text-xs text-slate-400">
          {visitors.length === 0
            ? 'No visitors yet — be the first to comment or like a post!'
            : 'No visitors match your search.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((visitor) => (
            <li key={visitor.name} className="flex items-center gap-2 text-sm">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${getAvatarColorClass(visitor.avatarColor)}`}
              >
                <img src={userIcon} alt="" className="h-4 w-4" />
              </span>
              <span className="text-slate-700">{visitor.name}</span>
            </li>
          ))}
        </ul>
      )}
      {visitors.length > 0 && (
        <p className="mt-3 text-xs text-slate-500">
          {visitors.length} Visitors total
        </p>
      )}
      {visitors.length > VISIBLE_LIMIT && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-1 cursor-pointer text-xs font-semibold text-[#1877F2] hover:underline"
        >
          View all {visitors.length} Visitors
        </button>
      )}
      {showAll && (
        <BlogVisitorsModal
          visitors={visitors}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  )
}

export default BlogVisitorsPanel
