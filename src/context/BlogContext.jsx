import { createContext, useContext, useState } from 'react'
import { blogPostSeeds } from '../components/blog/data/blogPostSeeds.js'
import {
  readVisitorIdentity,
  writeVisitorIdentity,
  clearVisitorIdentity,
} from '../utils/blogVisitor.js'
import {
  readInteractions,
  toggleLike as toggleLikeStorage,
  addComment as addCommentStorage,
} from '../utils/blogInteractions.js'

const BlogContext = createContext(null)

export function BlogProvider({ children }) {
  const [identity, setIdentity] = useState(() => readVisitorIdentity())
  const [interactionsByPost, setInteractionsByPost] = useState({})

  function getInteractions(postId) {
    return interactionsByPost[postId] ?? readInteractions(postId)
  }

  const posts = blogPostSeeds.map((post) => ({
    ...post,
    ...getInteractions(post.id),
  }))

  function setVisitor(name, avatarColor) {
    const next = { name, avatarColor }
    writeVisitorIdentity(next)
    setIdentity(next)
  }

  function logout() {
    clearVisitorIdentity()
    setIdentity(null)
  }

  function toggleLike(postId) {
    if (!identity) return
    const likes = toggleLikeStorage(postId, identity)
    setInteractionsByPost((prev) => ({
      ...prev,
      [postId]: { ...getInteractions(postId), likes },
    }))
  }

  function addComment(postId, text) {
    if (!identity || !text.trim()) return
    const comments = addCommentStorage(postId, {
      ...identity,
      text: text.trim(),
    })
    setInteractionsByPost((prev) => ({
      ...prev,
      [postId]: { ...getInteractions(postId), comments },
    }))
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
        toggleLike,
        addComment,
        getAllVisitors,
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
