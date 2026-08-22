import { useBlog } from '../../context/BlogContext.jsx'
import heartIcon from './assets/icons/heart icon.png'

function DurationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CreatedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 9h17M8 3v3M16 3v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AuthorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 20c0-3.6 3.13-6.5 7-6.5s7 2.9 7 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TagsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <path
        d="M11.5 4h-6A1.5 1.5 0 0 0 4 5.5v6c0 .4.16.78.44 1.06l8 8a1.5 1.5 0 0 0 2.12 0l6-6a1.5 1.5 0 0 0 0-2.12l-8-8A1.5 1.5 0 0 0 11.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
    </svg>
  )
}

function renderInlineText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

function BlogArticleModal({ post, article, onClose }) {
  const { visitorName, toggleLike } = useBlog()
  const hasLiked = post.likes.some((like) => like.name === visitorName)

  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-end border-b border-slate-200 px-4 py-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="scrollbar-light flex-1 overflow-y-auto p-6">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            {article.title}
          </h1>
          <img
            src={article.bannerImage}
            alt={article.title}
            className="mb-4 w-full rounded-lg object-cover"
          />
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs tracking-wide text-slate-500 uppercase">
            {[
              { Icon: DurationIcon, label: article.meta.duration },
              { Icon: CreatedIcon, label: article.meta.created },
              { Icon: AuthorIcon, label: `By ${article.meta.author}` },
              { Icon: TagsIcon, label: article.meta.tags.join(' • ') },
            ].map(({ Icon, label }, index) => (
              <span key={index} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="h-3 w-px shrink-0 bg-slate-300" />
                )}
                <span className="flex items-center gap-1.5">
                  <Icon />
                  {label}
                </span>
              </span>
            ))}
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm italic text-slate-500">{article.subtitle}</p>
            <button
              type="button"
              onClick={() => toggleLike(post.id)}
              className="flex cursor-pointer items-center gap-1.5 hover:opacity-80"
            >
              <img
                src={heartIcon}
                alt="Like"
                className={`h-5 w-5 ${hasLiked ? '' : 'opacity-50 grayscale'}`}
              />
              <span className="text-sm text-slate-700">
                {post.likes.length}
              </span>
            </button>
          </div>
          <hr className="mb-4 border-slate-200" />
          <div className="space-y-4 text-sm leading-relaxed text-slate-700">
            {article.content.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="pt-2 text-xl font-bold text-sky-700"
                  >
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className="list-disc space-y-2 pl-5">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <strong className="text-slate-900">{item.lead}</strong>{' '}
                        {renderInlineText(item.text)}
                      </li>
                    ))}
                  </ul>
                )
              }
              if (block.type === 'quote') {
                return (
                  <p
                    key={index}
                    className={`border-l-2 border-slate-300 pl-4 ${block.bold ? 'font-bold text-slate-900' : ''}`}
                  >
                    {renderInlineText(block.text)}
                  </p>
                )
              }
              return (
                <p
                  key={index}
                  className={block.bold ? 'font-bold text-slate-900' : ''}
                >
                  {renderInlineText(block.text)}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogArticleModal
