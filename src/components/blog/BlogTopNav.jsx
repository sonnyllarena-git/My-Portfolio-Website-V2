import { useBlog } from '../../context/BlogContext.jsx'
import { iconImages } from '../../assets/icons/index.js'
import searchIcon from './assets/icons/search icon.png'
import bellIcon from './assets/icons/bell icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'

function BlogTopNav({ onLogout }) {
  const { visitorName, visitorAvatarColor } = useBlog()

  return (
    <div className="flex items-center gap-4 bg-indigo-700 px-4 py-2">
      <img src={iconImages.blog} alt="Blog" className="h-9 w-9 rounded-full" />
      <div className="flex flex-1 items-center rounded-full bg-white px-3 py-1.5">
        <img src={searchIcon} alt="" className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none"
        />
      </div>
      <button type="button" aria-label="Notifications" className="shrink-0">
        <img src={bellIcon} alt="" className="h-6 w-6" />
      </button>
      <div className="flex shrink-0 items-center gap-2 text-sm text-white">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${getAvatarColorClass(visitorAvatarColor)}`}
        >
          <img src={userIcon} alt="" className="h-5 w-5" />
        </span>
        <span>Hi, {visitorName}</span>
        <button type="button" onClick={onLogout} className="underline">
          Log out
        </button>
      </div>
    </div>
  )
}

export default BlogTopNav
