import { createContext, useContext, useState } from 'react'
import { blogPostSeeds } from '../components/blog/data/blogPostSeeds.js'
import {
  readVisitorIdentity,
  writeVisitorIdentity,
  clearVisitorIdentity,
} from '../utils/blogVisitor.js'
import {
  fetchInteractions,
  fetchActivity,
  submitLike,
  submitComment,
  submitActivity,
} from '../utils/blogApi.js'

const BlogContext = createContext(null)
const EMPTY_INTERACTIONS = { likes: [], comments: [] }

export function BlogProvider({ children }) {
  const [identity, setIdentity] = useState(() => readVisitorIdentity())
  const [interactionsByPost, setInteractionsByPost] = useState({})
  const [activity, setActivity] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  async function loadBlogData() {
    if (loaded) return
    setLoading(true)
    try {
      const [interactions, activityLog] = await Promise.all([
        fetchInteractions(),
        fetchActivity(),
      ])
      setInteractionsByPost(interactions)
      setActivity(activityLog)
      setLoaded(true)
    } finally {
      setLoading(false)
    }
  }

  const posts = blogPostSeeds.map((post) => ({
    ...post,
    ...(interactionsByPost[post.id] ?? EMPTY_INTERACTIONS),
  }))

  function setVisitor(name, avatarColor) {
    const next = { name, avatarColor }
    writeVisitorIdentity(next)
    setIdentity(next)
    submitActivity({ type: 'join', name, avatarColor })
      .then((entry) => setActivity((prev) => [entry, ...prev]))
      .catch(() => {
        // Best-effort — a network hiccup just means this join won't show in the feed.
      })
  }

  function logout() {
    clearVisitorIdentity()
    setIdentity(null)
  }

  async function toggleLike(postId) {
    if (!identity) return
    try {
      const { likes, activity: activityEntry } = await submitLike(
        postId,
        identity,
      )
      setInteractionsByPost((prev) => ({
        ...prev,
        [postId]: { ...(prev[postId] ?? EMPTY_INTERACTIONS), likes },
      }))
      if (activityEntry) setActivity((prev) => [activityEntry, ...prev])
    } catch {
      // Best-effort — a network hiccup just means the like didn't register this time.
    }
  }

  async function addComment(postId, text) {
    if (!identity || !text.trim()) return
    try {
      const { comments, activity: activityEntry } = await submitComment(
        postId,
        { ...identity, text: text.trim() },
      )
      setInteractionsByPost((prev) => ({
        ...prev,
        [postId]: { ...(prev[postId] ?? EMPTY_INTERACTIONS), comments },
      }))
      if (activityEntry) setActivity((prev) => [activityEntry, ...prev])
    } catch {
      // Best-effort — a network hiccup just means the comment didn't post this time.
    }
  }

  function getAllVisitors() {
    const seen = new Map()
    posts.forEach((post) => {
      post.likes.forEach((like) => seen.set(like.name, like))
      post.comments.forEach((comment) =>
        seen.set(comment.name, {
          name: comment.name,
          avatarColor: comment.avatarColor,
        }),
      )
    })
    return Array.from(seen.values())
  }

  return (
    <BlogContext.Provider
      value={{
        visitorName: identity?.name ?? null,
        visitorAvatarColor: identity?.avatarColor ?? null,
        setVisitor,
        logout,
        posts,
        loading,
        loadBlogData,
        toggleLike,
        addComment,
        getAllVisitors,
        activity,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}
