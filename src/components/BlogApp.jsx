import { useIsMobile } from '../hooks/useIsMobile.js'
import BlogTopNav from './blog/BlogTopNav.jsx'
import BlogProfileCard from './blog/BlogProfileCard.jsx'
import BlogNewsWidget from './blog/BlogNewsWidget.jsx'
import BlogPhotosWidget from './blog/BlogPhotosWidget.jsx'
import BlogFeed from './blog/BlogFeed.jsx'
import BlogVisitorsPanel from './blog/BlogVisitorsPanel.jsx'

function BlogApp({
  onOpenContactInfo,
  onLogout,
  onClose,
  onMaximize,
  isMaximized,
}) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <BlogTopNav
        onOpenContactInfo={onOpenContactInfo}
        onLogout={onLogout}
        onClose={onClose}
        onMaximize={onMaximize}
        isMaximized={isMaximized}
      />
      <div className="flex-1 overflow-auto p-4">
        <div
          className={`mx-auto flex w-full max-w-6xl gap-4 ${isMobile ? 'flex-col' : ''}`}
        >
          <div className={`space-y-4 ${isMobile ? '' : 'w-72 shrink-0'}`}>
            <BlogProfileCard onOpenContactInfo={onOpenContactInfo} />
            <BlogNewsWidget />
            <BlogPhotosWidget />
          </div>
          <BlogFeed />
          <div className={isMobile ? '' : 'w-56 shrink-0'}>
            <BlogVisitorsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogApp
