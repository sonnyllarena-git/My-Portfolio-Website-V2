export const MOCK_VISITORS = [
  { name: 'Ava Brooks', avatarColor: 'rose' },
  { name: 'Liam Chen', avatarColor: 'sky' },
  { name: 'Sofia Martinez', avatarColor: 'amber' },
  { name: 'Noah Kim', avatarColor: 'emerald' },
  { name: 'Mia Johnson', avatarColor: 'violet' },
  { name: 'Ethan Wright', avatarColor: 'fuchsia' },
  { name: 'Olivia Turner', avatarColor: 'orange' },
  { name: 'Lucas Rivera', avatarColor: 'teal' },
  { name: 'Emma Clarke', avatarColor: 'rose' },
  { name: 'James Patel', avatarColor: 'sky' },
  { name: 'Isabella Novak', avatarColor: 'amber' },
  { name: 'Benjamin Lee', avatarColor: 'emerald' },
  { name: 'Charlotte Diaz', avatarColor: 'violet' },
  { name: 'Henry Walker', avatarColor: 'fuchsia' },
  { name: 'Amelia Scott', avatarColor: 'orange' },
  { name: 'Jack Nguyen', avatarColor: 'teal' },
  { name: 'Grace Bennett', avatarColor: 'rose' },
  { name: 'Daniel Foster', avatarColor: 'sky' },
  { name: 'Chloe Ramirez', avatarColor: 'amber' },
  { name: 'Matthew Reed', avatarColor: 'emerald' },
]

const POST_IDS = ['blog-1', 'blog-2', 'blog-3']

const COMMENT_TEXTS = [
  'Love this!',
  'Great read, thanks for sharing!',
  "Can't wait for more posts like this.",
  'This is awesome, Sonny!',
  'Really enjoyed this one.',
  'So cool!',
]

const BASE_TIME = new Date('2026-08-18T09:00:00Z').getTime()

export function buildMockInteractionsAndActivity() {
  const interactionsByPost = {}
  POST_IDS.forEach((postId) => {
    interactionsByPost[postId] = { likes: [], comments: [] }
  })

  const activity = []
  let tick = 0
  function nextTimestamp() {
    tick += 1
    return new Date(BASE_TIME + tick * 45 * 60000).toISOString()
  }

  MOCK_VISITORS.forEach((visitor, index) => {
    activity.push({
      id: `mock-join-${index}`,
      type: 'join',
      name: visitor.name,
      avatarColor: visitor.avatarColor,
      postId: null,
      timestamp: nextTimestamp(),
    })

    const postId = POST_IDS[index % POST_IDS.length]

    if (index % 3 !== 2) {
      interactionsByPost[postId].likes.push({
        name: visitor.name,
        avatarColor: visitor.avatarColor,
      })
      activity.push({
        id: `mock-like-${index}`,
        type: 'like',
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        postId,
        timestamp: nextTimestamp(),
      })
    }

    if (index % 2 === 0) {
      const commentTime = nextTimestamp()
      interactionsByPost[postId].comments.push({
        id: `mock-comment-${index}`,
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        text: COMMENT_TEXTS[index % COMMENT_TEXTS.length],
        timestamp: commentTime,
      })
      activity.push({
        id: `mock-comment-activity-${index}`,
        type: 'comment',
        name: visitor.name,
        avatarColor: visitor.avatarColor,
        postId,
        timestamp: commentTime,
      })
    }
  })

  activity.reverse()
  return { interactionsByPost, activity }
}
