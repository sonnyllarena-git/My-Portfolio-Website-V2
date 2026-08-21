import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'
import { formatRelativeTime } from '../../utils/formatRelativeTime.js'

function BlogCommentsModal({ comments, onClose }) {
  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Comments ({comments.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="scrollbar-light flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2 text-sm">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${getAvatarColorClass(comment.avatarColor)}`}
                >
                  <img src={userIcon} alt="" className="h-4 w-4" />
                </span>
                <span>
                  <strong className="text-slate-900">{comment.name}</strong>{' '}
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(comment.timestamp)}
                  </span>
                  <br />
                  <span className="text-slate-600">{comment.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCommentsModal
