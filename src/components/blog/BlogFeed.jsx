import { useBlog } from '../../context/BlogContext.jsx'
import BlogPostCard from './BlogPostCard.jsx'

function BlogFeed() {
  const { posts } = useBlog()

  return (
    <div className="flex-1 space-y-4">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-center text-lg font-semibold text-slate-900">
          Sonny's Latest Blog
        </h2>
      </div>
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default BlogFeed
