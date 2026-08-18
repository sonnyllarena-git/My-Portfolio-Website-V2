import {
  CHAT_CATEGORIES,
  FALLBACK_RESPONSE,
  SUGGESTED_QUESTIONS,
  FOLLOW_UPS,
  AUTO_REPLY_PATTERNS,
} from '../data/zoomChatKnowledgeBase.js'

export function matchQuestion(userInput) {
  const input = userInput.toLowerCase()
  let bestCategory = null
  let bestScore = 0

  for (const category of CHAT_CATEGORIES) {
    const score = category.keywords.reduce(
      (acc, keyword) => (input.includes(keyword) ? acc + 1 : acc),
      0,
    )
    if (score > bestScore) {
      bestScore = score
      bestCategory = category
    }
  }

  return bestCategory
}

export function getBotReply(userInput) {
  const category = matchQuestion(userInput)
  if (category) {
    return { matched: true, category, text: category.response }
  }
  return {
    matched: false,
    category: null,
    text: FALLBACK_RESPONSE,
    suggestions: SUGGESTED_QUESTIONS,
  }
}

function matchesKeyword(message, keyword) {
  if (keyword.includes(' ')) return message.includes(keyword)
  return new RegExp(`\\b${keyword}\\b`).test(message)
}

export function getAutoReply(userMessage) {
  const message = userMessage.toLowerCase()
  for (const pattern of AUTO_REPLY_PATTERNS) {
    if (pattern.keywords.some((kw) => matchesKeyword(message, kw))) {
      return pattern.reply
    }
  }
  return null
}

const DEFAULT_FOLLOW_UP = {
  question: 'Is there anything else I can clarify about that?',
  options: null,
}

export function getFollowUp(categoryId) {
  const followUp = FOLLOW_UPS[categoryId] || DEFAULT_FOLLOW_UP
  return {
    question: followUp.question,
    options: followUp.options
      ? followUp.options.map((text, idx) => ({
          label: String.fromCharCode(65 + idx),
          text,
        }))
      : null,
  }
}

function getTimeOfDay(date) {
  const hour = date.getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 24) return 'evening'
  return 'night'
}

const GREETINGS = {
  morning: (name) => `Good morning, ${name}! How can I help you today?`,
  afternoon: (name) => `Good afternoon, ${name}! What can I help with?`,
  evening: (name) => `Good evening, ${name}! What can I help you with?`,
  night: (name) =>
    `Hello ${name}! Burning the midnight oil? What can I help with?`,
}

export function getTimeBasedGreeting(guestName, date = new Date()) {
  const name = guestName || 'there'
  const period = getTimeOfDay(date)
  return GREETINGS[period](name)
}
