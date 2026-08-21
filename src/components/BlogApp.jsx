import { useIsMobile } from '../hooks/useIsMobile.js'
import BlogTopNav from './blog/BlogTopNav.jsx'
import BlogProfileCard from './blog/BlogProfileCard.jsx'
import BlogNewsWidget from './blog/BlogNewsWidget.jsx'
import BlogPhotosWidget from './blog/BlogPhotosWidget.jsx'
import BlogFeed from './blog/BlogFeed.jsx'
import BlogVisitorsPanel from './blog/BlogVisitorsPanel.jsx'

function BlogApp({ onOpenContactInfo, onLogout }) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-full flex-col bg-slate-100">
      <BlogTopNav onLogout={onLogout} />
      <div
        className={`flex flex-1 gap-4 overflow-auto p-4 ${isMobile ? 'flex-col' : ''}`}
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
  )
}

export default BlogApp
