const KEY_PREFIX = 'blog:interactions:'

function emptyInteractions() {
  return { likes: [], comments: [] }
}

export function readInteractions(postId) {
  const key = KEY_PREFIX + postId
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      const seeded = emptyInteractions()
      localStorage.setItem(key, JSON.stringify(seeded))
      return seeded
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed?.likes) && Array.isArray(parsed?.comments)
      ? parsed
      : emptyInteractions()
  } catch {
    return emptyInteractions()
  }
}

function writeInteractions(postId, data) {
  localStorage.setItem(KEY_PREFIX + postId, JSON.stringify(data))
  return data
}

export function toggleLike(postId, { name, avatarColor }) {
  const current = readInteractions(postId)
  const alreadyLiked = current.likes.some((like) => like.name === name)
  const likes = alreadyLiked
    ? current.likes.filter((like) => like.name !== name)
    : [...current.likes, { name, avatarColor }]
  return writeInteractions(postId, { ...current, likes }).likes
}

export function addComment(postId, { name, avatarColor, text }) {
  const current = readInteractions(postId)
  const comment = {
    id: `comment-${postId}-${Date.now()}-${current.comments.length}`,
    name,
    avatarColor,
    text,
    timestamp: new Date().toISOString(),
  }
  const comments = [...current.comments, comment]
  return writeInteractions(postId, { ...current, comments }).comments
}
