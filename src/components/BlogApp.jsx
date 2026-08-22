import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile.js'
import BlogTopNav from './blog/BlogTopNav.jsx'
import BlogProfileCard from './blog/BlogProfileCard.jsx'
import BlogNewsWidget from './blog/BlogNewsWidget.jsx'
import BlogPhotosWidget from './blog/BlogPhotosWidget.jsx'
import BlogSponsoredWidget from './blog/BlogSponsoredWidget.jsx'
import BlogFeed from './blog/BlogFeed.jsx'
import BlogVisitorsPanel from './blog/BlogVisitorsPanel.jsx'
import BlogChatWidget from './blog/BlogChatWidget.jsx'

function BlogApp({
  onOpenContactInfo,
  onOpenGames,
  onOpenGmail,
  onMinimize,
  onMaximize,
  onLogout,
}) {
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState('')
  const scrollRef = useRef(null)
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function measure() {
      setScrollbarWidth(el.offsetWidth - el.clientWidth)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [searchQuery])

  return (
    <div className="relative flex h-full flex-col bg-slate-100">
      <BlogTopNav
        onOpenContactInfo={onOpenContactInfo}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        scrollbarWidth={scrollbarWidth}
      />
      <div ref={scrollRef} className="flex-1 overflow-auto p-4">
        <div
          className={`mx-auto flex w-full max-w-6xl gap-4 ${isMobile ? 'flex-col' : ''}`}
        >
          <div className={`space-y-4 ${isMobile ? '' : 'w-72 shrink-0'}`}>
            <BlogProfileCard onOpenContactInfo={onOpenContactInfo} />
            <BlogNewsWidget />
            <BlogPhotosWidget />
            <BlogSponsoredWidget onOpenGames={onOpenGames} />
          </div>
          <BlogFeed searchQuery={searchQuery} />
          <div className={isMobile ? '' : 'w-56 shrink-0'}>
            <BlogVisitorsPanel />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-40 p-4">
        <div className="relative mx-auto h-full w-full max-w-6xl">
          <BlogChatWidget onOpenGmail={onOpenGmail} />
        </div>
      </div>
    </div>
  )
}

export default BlogApp
