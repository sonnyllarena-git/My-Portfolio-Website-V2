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
  onMinimize,
  onMaximize,
  onLogout,
  searchQuery,
  onSearchChange,
  scrollbarWidth = 0,
}) {
  const { visitorName, visitorAvatarColor } = useBlog()
  const [openPanel, setOpenPanel] = useState(null)

  return (
    <div
      className="window-title-bar cursor-move bg-slate-100 py-2 pl-4"
      style={{ paddingRight: 16 + scrollbarWidth }}
    >
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-lg px-4 py-2 ${BRAND_BLUE_BG}`}
      >
        <div className="flex items-center gap-4">
          <img
            src={iconImages.blog}
            alt="Blog"
            className="h-9 w-9 rounded-full"
          />
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex w-96 items-center rounded-full bg-white px-3 py-1.5"
          >
            <img src={searchIcon} alt="" className="h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              aria-label="Search blogs"
              className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() =>
                setOpenPanel((prev) =>
                  prev === 'activity' ? null : 'activity',
                )
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
                onMinimize={onMinimize}
                onMaximize={onMaximize}
                onLogout={onLogout}
                onClose={() => setOpenPanel(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTopNav
