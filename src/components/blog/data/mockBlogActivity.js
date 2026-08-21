import { AVATAR_COLORS } from '../avatarColors.js'

export const SEED_VERSION = 2

const FIRST_NAMES = [
  'Ava',
  'Liam',
  'Sofia',
  'Noah',
  'Mia',
  'Ethan',
  'Olivia',
  'Lucas',
  'Emma',
  'James',
  'Isabella',
  'Benjamin',
  'Charlotte',
  'Henry',
  'Amelia',
  'Jack',
  'Grace',
  'Daniel',
  'Chloe',
  'Matthew',
  'Zoe',
  'Ryan',
  'Aria',
  'Owen',
  'Layla',
]

const LAST_NAMES = [
  'Brooks',
  'Chen',
  'Martinez',
  'Kim',
  'Johnson',
  'Wright',
  'Turner',
  'Rivera',
  'Clarke',
  'Patel',
  'Novak',
  'Lee',
  'Diaz',
  'Walker',
  'Scott',
  'Nguyen',
  'Bennett',
  'Foster',
  'Ramirez',
  'Reed',
]

const VISITOR_COUNT = 150

function createRng(seed) {
  let state = seed
  return function rng() {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffledIndices(count, total, rng) {
  const pool = Array.from({ length: total }, (_, i) => i)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}

const nameRng = createRng(13)
const nameIndices = shuffledIndices(
  VISITOR_COUNT,
  FIRST_NAMES.length * LAST_NAMES.length,
  nameRng,
)

export const MOCK_VISITORS = nameIndices.map((combinedIndex, i) => ({
  name: `${FIRST_NAMES[combinedIndex % FIRST_NAMES.length]} ${LAST_NAMES[Math.floor(combinedIndex / FIRST_NAMES.length)]}`,
  avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length].id,
}))

const POST_IDS = ['blog-1', 'blog-2', 'blog-3']

const COMMENT_TEXTS = [
  'Love this!',
  'Great read, thanks for sharing!',
  "Can't wait for more posts like this.",
  'This is awesome, Sonny!',
  'Really enjoyed this one.',
  'So cool!',
  'This gave me a great idea for my own project.',
  "You explain this stuff so clearly, I'm bookmarking it.",
  'Been following your work for a while, keep it up!',
  'Exactly what I needed to read today.',
  "Didn't expect this angle, nice take.",
  'Saving this for later, solid write-up.',
  'This is underrated, more people should see this.',
  'Your portfolio inspired me to redo my own site.',
  'The detail in this post is impressive.',
  'Following your blog has taught me a lot.',
  'This deserves way more likes.',
  'Sharing this with my team, great stuff.',
  'You always post the most useful content.',
  'This made my day, thank you!',
  "I've read this three times now, so good.",
  'The way you break this down is super helpful.',
  'Can you do a follow-up on this topic?',
  'This is going straight into my bookmarks.',
]

const MS_PER_HOUR = 3600000

const SEED_START = Date.parse('2025-12-01T00:00:00')
const SEED_END = Date.now()

function clampToWindow(time) {
  return Math.min(Math.max(time, SEED_START), SEED_END)
}

export function buildMockInteractionsAndActivity() {
  const rng = createRng(20251201)
  const interactionsByPost = {}
  POST_IDS.forEach((postId) => {
    interactionsByPost[postId] = { likes: [], comments: [] }
  })

  const activity = []
  let entryCounter = 0

  function pushActivity(entry) {
    entryCounter += 1
    activity.push({ id: `mock-${entryCounter}`, ...entry })
  }

  function randomPostId() {
    return POST_IDS[Math.floor(rng() * POST_IDS.length)]
  }

  MOCK_VISITORS.forEach((visitor) => {
    const joinTime = clampToWindow(SEED_START + rng() * (SEED_END - SEED_START))
    pushActivity({
      type: 'join',
      name: visitor.name,
      avatarColor: visitor.avatarColor,
      postId: null,
      timestamp: new Date(joinTime).toISOString(),
    })

    const likedPostId = randomPostId()
    const likeTime = clampToWindow(joinTime + rng() * MS_PER_HOUR * 6)
    interactionsByPost[likedPostId].likes.push({
      name: visitor.name,
      avatarColor: visitor.avatarColor,
    })
    pushActivity({
      type: 'like',
      name: visitor.name,
      avatarColor: visitor.avatarColor,
      postId: likedPostId,
      timestamp: new Date(likeTime).toISOString(),
    })

    if (rng() < 0.3) {
      const secondPostId = POST_IDS.find((id) => id !== likedPostId)
      const secondLikeTime = clampToWindow(likeTime + rng() * MS_PER_HOUR * 3)
      interactionsByPost[secondPostId].likes.push({
        name: visitor.name,
        avatarColor: visitor.avatarColor,
      })
      pushActivity({
        type: 'like',
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        postId: secondPostId,
        timestamp: new Date(secondLikeTime).toISOString(),
      })
    }

    if (rng() < 0.55) {
      const commentPostId = randomPostId()
      const commentTime = clampToWindow(likeTime + rng() * MS_PER_HOUR * 4)
      const commentIso = new Date(commentTime).toISOString()
      interactionsByPost[commentPostId].comments.push({
        id: `mock-comment-${entryCounter}`,
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        text: COMMENT_TEXTS[Math.floor(rng() * COMMENT_TEXTS.length)],
        timestamp: commentIso,
      })
      pushActivity({
        type: 'comment',
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        postId: commentPostId,
        timestamp: commentIso,
      })
    }
  })

  activity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  return { interactionsByPost, activity }
}
