import { useState } from 'react'
import { useBlog } from '../../context/BlogContext.jsx'
import { iconImages } from '../../assets/icons/index.js'
import searchIcon from './assets/icons/search icon.png'
import bellIcon from './assets/icons/bell icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'
import { BRAND_BLUE_BG } from './theme.js'
import BlogUserMenu from './BlogUserMenu.jsx'
import BlogActivityPanel from './BlogActivityPanel.jsx'

function BlogTopNav({
  onOpenContactInfo,
  onLogout,
  onClose,
  onMaximize,
  isMaximized,
}) {
  const { visitorName, visitorAvatarColor } = useBlog()
  const [openPanel, setOpenPanel] = useState(null)

  return (
    <div
      className={`window-title-bar flex cursor-move items-center gap-4 px-4 py-2 ${BRAND_BLUE_BG}`}
    >
      <img src={iconImages.blog} alt="Blog" className="h-9 w-9 rounded-full" />
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex flex-1 items-center rounded-full bg-white px-3 py-1.5"
      >
        <img src={searchIcon} alt="" className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
        />
      </div>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative shrink-0"
      >
        <button
          type="button"
          onClick={() =>
            setOpenPanel((prev) => (prev === 'activity' ? null : 'activity'))
          }
          aria-label="Notifications"
          className="cursor-pointer hover:opacity-80"
        >
          <img src={bellIcon} alt="" className="h-6 w-6" />
        </button>
        {openPanel === 'activity' && (
          <BlogActivityPanel onClose={() => setOpenPanel(null)} />
        )}
      </div>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative shrink-0"
      >
        <button
          type="button"
          onClick={() =>
            setOpenPanel((prev) => (prev === 'user' ? null : 'user'))
          }
          aria-label={`Account menu for ${visitorName}`}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:opacity-80 ${getAvatarColorClass(visitorAvatarColor)}`}
        >
          <img src={userIcon} alt="" className="h-5 w-5" />
        </button>
        {openPanel === 'user' && (
          <BlogUserMenu
            onOpenContactInfo={onOpenContactInfo}
            onLogout={onLogout}
            onClose={() => setOpenPanel(null)}
          />
        )}
      </div>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex shrink-0 items-center gap-1"
      >
        <button
          type="button"
          onClick={onMaximize}
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
          className="flex h-7 w-7 items-center justify-center rounded text-sm text-white hover:bg-white/20"
        >
          {isMaximized ? '❐' : '□'}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-7 w-7 items-center justify-center rounded text-lg text-white hover:bg-red-500/80"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default BlogTopNav
