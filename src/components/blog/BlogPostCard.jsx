import { useState } from 'react'
import { useBlog } from '../../context/BlogContext.jsx'
import heartIcon from './assets/icons/heart icon.png'
import sendIcon from './assets/icons/send icon.png'
import userIcon from './assets/icons/user icon.png'
import { getAvatarColorClass } from './avatarColors.js'
import { formatRelativeTime } from '../../utils/formatRelativeTime.js'
import CommentIcon from '../icons/CommentIcon.jsx'
import BlogCommentsModal from './BlogCommentsModal.jsx'
import BlogArticleModal from './BlogArticleModal.jsx'
import { blogArticles } from './data/blogArticles.js'

function BlogPostCard({ post }) {
  const { visitorName, toggleLike, addComment } = useBlog()
  const [commentText, setCommentText] = useState('')
  const [showAllComments, setShowAllComments] = useState(false)
  const [showArticle, setShowArticle] = useState(false)
  const article = blogArticles[post.id]
  const hasLiked = post.likes.some((like) => like.name === visitorName)
  const latestComment = post.comments[post.comments.length - 1]

  function handleCommentSubmit(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    addComment(post.id, commentText)
    setCommentText('')
  }

  return (
    <div
      id={`blog-post-${post.id}`}
      className="rounded-lg bg-white p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
          <img src={userIcon} alt="" className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold text-slate-900">
          {post.authorName}
        </span>
        <span className="text-sm text-slate-500">'{post.title}'</span>
      </div>
      {article ? (
        <>
          <img
            src={article.bannerImage}
            alt={post.title}
            className="mb-3 aspect-video w-full rounded object-cover"
          />
          <button
            type="button"
            onClick={() => setShowArticle(true)}
            className="mb-3 w-full cursor-pointer rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Read Article
          </button>
        </>
      ) : (
        <div className="mb-3 grid grid-cols-4 gap-1 overflow-hidden rounded">
          {post.collageColors.map((color, index) => (
            <div key={index} className={`aspect-square ${color}`} />
          ))}
        </div>
      )}
      {showArticle && (
        <BlogArticleModal
          post={post}
          article={article}
          onClose={() => setShowArticle(false)}
        />
      )}
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => toggleLike(post.id)}
          className="cursor-pointer hover:opacity-80"
        >
          <img
            src={heartIcon}
            alt="Like"
            className={`h-5 w-5 ${hasLiked ? '' : 'opacity-50 grayscale'}`}
          />
        </button>
        <span className="text-sm text-slate-600">{post.likes.length}</span>
        <CommentIcon className="h-5 w-5 text-slate-400" />
        <span className="text-sm text-slate-400">{post.comments.length}</span>
      </div>
      <div className="mb-3 space-y-2">
        {post.comments.length > 1 && (
          <button
            type="button"
            onClick={() => setShowAllComments(true)}
            className="cursor-pointer text-sm text-slate-400 hover:underline"
          >
            View more comments
          </button>
        )}
        {latestComment && (
          <div className="flex items-start gap-2 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${getAvatarColorClass(latestComment.avatarColor)}`}
            >
              <img src={userIcon} alt="" className="h-4 w-4" />
            </span>
            <span>
              <strong className="text-slate-900">{latestComment.name}</strong>{' '}
              <span className="text-xs text-slate-400">
                {formatRelativeTime(latestComment.timestamp)}
              </span>
              <br />
              <span className="text-slate-600">{latestComment.text}</span>
            </span>
          </div>
        )}
      </div>
      {showAllComments && (
        <BlogCommentsModal
          comments={post.comments}
          onClose={() => setShowAllComments(false)}
        />
      )}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="add comment"
          aria-label="Add a comment"
          className="flex-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-900 outline-none"
        />
        <button
          type="submit"
          aria-label="Send comment"
          className="cursor-pointer hover:opacity-80"
        >
          <img src={sendIcon} alt="" className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

export default BlogPostCard
