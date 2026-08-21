import { useEffect, useRef } from 'react'
import { useBlog } from '../../context/BlogContext.jsx'
import { getAvatarColorClass } from './avatarColors.js'
import userIcon from './assets/icons/user icon.png'

function describeActivity(entry, posts) {
  const post = entry.postId ? posts.find((p) => p.id === entry.postId) : null
  if (entry.type === 'like')
    return `${entry.name} liked '${post?.title ?? 'a post'}'`
  if (entry.type === 'comment')
    return `${entry.name} commented on '${post?.title ?? 'a post'}'`
  return `${entry.name} entered Sonny's blog`
}

function BlogActivityPanel({ onClose }) {
  const { activity, posts } = useBlog()
  const panelRef = useRef(null)

  useEffect(() => {
    function handleOutsideMouseDown(e) {
      if (!panelRef.current?.contains(e.target)) onClose()
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [onClose])

  function handleRowClick(entry) {
    onClose()
    if (!entry.postId) return
    document
      .getElementById(`blog-post-${entry.postId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      ref={panelRef}
      className="absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-2xl bg-[#18191a] text-sm text-white shadow-2xl"
    >
      <p className="border-b border-white/10 px-4 py-3 font-semibold">
        Activity
      </p>
      {activity.length === 0 ? (
        <p className="px-4 py-3 text-xs text-white/60">No activity yet.</p>
      ) : (
        <ul>
          {activity.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => handleRowClick(entry)}
                className="flex w-full cursor-pointer items-center gap-2 border-b border-white/10 px-4 py-2.5 text-left hover:bg-white/10"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${getAvatarColorClass(entry.avatarColor)}`}
                >
                  <img src={userIcon} alt="" className="h-4 w-4" />
                </span>
                <span className="text-xs text-white/80">
                  {describeActivity(entry, posts)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogActivityPanel
