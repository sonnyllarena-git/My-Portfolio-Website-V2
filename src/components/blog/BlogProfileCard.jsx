import { useBlog } from '../../context/BlogContext.jsx'
import userIcon from './assets/icons/user icon.png'
import { BRAND_BLUE_BG, BRAND_BLUE_MUTED_TEXT } from './theme.js'

function BlogProfileCard({ onOpenContactInfo }) {
  const { posts, getAllVisitors } = useBlog()

  return (
    <div className={`rounded-lg p-4 text-white ${BRAND_BLUE_BG}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <img src={userIcon} alt="" className="h-9 w-9" />
        </span>
        <span className="text-lg font-semibold tracking-wide">
          SONNY LLARENA
        </span>
      </div>
      <div className="mt-4 flex gap-6 text-sm">
        <span>
          <strong>{posts.length}</strong> Posts
        </span>
        <span>
          <strong>{getAllVisitors().length}</strong> Visitors
        </span>
      </div>
      <p
        className={`mt-4 text-xs font-semibold uppercase tracking-wide ${BRAND_BLUE_MUTED_TEXT}`}
      >
        About Me:
      </p>
      <button
        type="button"
        onClick={onOpenContactInfo}
        className={`mt-4 text-xs font-semibold uppercase tracking-wide underline ${BRAND_BLUE_MUTED_TEXT}`}
      >
        Contact me:
      </button>
    </div>
  )
}

export default BlogProfileCard
