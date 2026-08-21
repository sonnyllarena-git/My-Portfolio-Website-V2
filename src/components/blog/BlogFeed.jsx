import { useBlog } from '../../context/BlogContext.jsx'
import BlogPostCard from './BlogPostCard.jsx'

function BlogFeed({ searchQuery = '' }) {
  const { posts } = useBlog()
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-center text-lg font-semibold text-slate-900">
          Sonny's Latest Blog
        </h2>
      </div>
      {visiblePosts.length === 0 ? (
        <div className="rounded-lg bg-white p-4 text-center text-sm text-slate-400 shadow-sm">
          No blogs match your search.
        </div>
      ) : (
        visiblePosts.map((post) => <BlogPostCard key={post.id} post={post} />)
      )}
    </div>
  )
}

export default BlogFeed
