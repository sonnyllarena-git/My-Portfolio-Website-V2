import { useBlog } from '../../context/BlogContext.jsx'
import searchIcon from './assets/icons/search icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'

function BlogVisitorsPanel() {
  const { getAllVisitors } = useBlog()
  const visitors = getAllVisitors()

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Visitors</h3>
      <div className="mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
        <img src={searchIcon} alt="" className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search visitors"
          className="w-full bg-transparent text-sm text-slate-900 outline-none"
        />
      </div>
      {visitors.length === 0 ? (
        <p className="text-xs text-slate-400">
          No visitors yet — be the first to comment or like a post!
        </p>
      ) : (
        <ul className="space-y-2">
          {visitors.map((visitor) => (
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
    </div>
  )
}

export default BlogVisitorsPanel
