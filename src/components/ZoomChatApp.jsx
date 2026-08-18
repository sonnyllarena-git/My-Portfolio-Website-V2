import { useEffect, useRef, useState } from 'react'
import {
  NAME_PROMPT,
  getEmailPrompt,
  SUGGESTED_QUESTIONS,
} from '../data/zoomChatKnowledgeBase.js'
import {
  getAutoReply,
  getBotReply,
  getFollowUp,
  getTimeBasedGreeting,
} from '../utils/zoomChatBot.js'
import ZoomChatLoading from './zoomChat/ZoomChatLoading.jsx'
import ZoomChatHeader from './zoomChat/ZoomChatHeader.jsx'
import ZoomChatMessage from './zoomChat/ZoomChatMessage.jsx'

const ANYTHING_ELSE_REPLY = 'Great! Is there anything else I can help you with?'
const CONTACT_CTA = {
  label: 'Contact Sonny directly',
  text: "I couldn't find an answer to that. Would you like to contact Sonny directly?",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LOADING_MS = 2000
const REPLY_DELAY_MS = 500

let idCounter = 0
function makeMessage(role, content, extra = {}) {
  idCounter += 1
  return { id: idCounter, role, content, timestamp: new Date(), ...extra }
}

function ZoomChatApp({ onClose, onOpenGmail }) {
  const [phase, setPhase] = useState('loading')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [guestName, setGuestName] = useState(null)
  const [pendingFollowUpMessageId, setPendingFollowUpMessageId] = useState(null)
  const scrollRef = useRef(null)
  const pendingFollowUpRef = useRef(null)
  const consecutiveMissesRef = useRef(0)

  function appendMessage(msg) {
    setMessages((prev) => [...prev, msg])
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhase('gate')
      appendMessage(makeMessage('bot', null, { joinMeeting: true }))
    }, LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isTyping])

  function handleJoinMeeting() {
    setPhase('name')
    appendMessage(makeMessage('bot', NAME_PROMPT))
  }

  function replyAfterDelay(content, extra = {}) {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      appendMessage(makeMessage('bot', content, extra))
    }, REPLY_DELAY_MS)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    setInput('')

    if (phase === 'loading') return

    if (phase === 'gate') {
      replyAfterDelay('Please click "Join a meeting" above to start chatting.')
      return
    }

    if (phase === 'name') {
      if (!trimmed) {
        replyAfterDelay(
          "I'll need your name before we can continue — mind sharing it?",
        )
        return
      }
      appendMessage(makeMessage('guest', trimmed))
      setGuestName(trimmed)
      setPhase('email')
      replyAfterDelay(getEmailPrompt(trimmed))
      return
    }

    if (phase === 'email') {
      if (!trimmed) {
        replyAfterDelay(
          "I'll need your email before we can continue — mind sharing it?",
        )
        return
      }
      appendMessage(makeMessage('guest', trimmed))
      if (!EMAIL_REGEX.test(trimmed)) {
        replyAfterDelay(
          "Hmm, that doesn't look like a valid email — mind double-checking it?",
        )
        return
      }
      setPhase('active')
      replyAfterDelay(getTimeBasedGreeting(guestName), {
        suggestions: SUGGESTED_QUESTIONS,
      })
      return
    }

    if (phase === 'active') {
      appendMessage(makeMessage('guest', trimmed))
      respondActive(trimmed)
    }
  }

  function respondActive(trimmed) {
    const autoReply = getAutoReply(trimmed)
    if (autoReply) {
      consecutiveMissesRef.current = 0
      replyAfterDelay(autoReply)
      return
    }

    if (pendingFollowUpRef.current) {
      const { messageId } = pendingFollowUpRef.current
      pendingFollowUpRef.current = null
      setPendingFollowUpMessageId(null)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, choiceMade: trimmed } : m,
        ),
      )
      replyAfterDelay(ANYTHING_ELSE_REPLY)
      return
    }

    const reply = getBotReply(trimmed)
    if (reply.matched) {
      consecutiveMissesRef.current = 0
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        appendMessage(
          makeMessage('bot', reply.text, {
            cta: { label: reply.category.cta },
          }),
        )
        const followUp = getFollowUp(reply.category.id)
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const followUpMessage = makeMessage('bot', followUp.question, {
            multipleChoice: followUp.options
              ? { options: followUp.options, categoryId: reply.category.id }
              : undefined,
          })
          pendingFollowUpRef.current = { messageId: followUpMessage.id }
          setPendingFollowUpMessageId(followUpMessage.id)
          appendMessage(followUpMessage)
        }, REPLY_DELAY_MS)
      }, REPLY_DELAY_MS)
      return
    }

    replyAfterDelay(reply.text, { suggestions: reply.suggestions })
    consecutiveMissesRef.current += 1
    if (consecutiveMissesRef.current >= 2) {
      consecutiveMissesRef.current = 0
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        appendMessage(
          makeMessage('bot', CONTACT_CTA.text, {
            cta: { label: CONTACT_CTA.label },
          }),
        )
      }, REPLY_DELAY_MS * 2)
    }
  }

  function handleSuggestionClick(text) {
    appendMessage(makeMessage('guest', text))
    respondActive(text)
  }

  function handleMultipleChoiceSelect(message, option) {
    if (message.choiceMade || pendingFollowUpMessageId !== message.id) return
    pendingFollowUpRef.current = null
    setPendingFollowUpMessageId(null)
    setMessages((prev) =>
      prev.map((m) =>
        m.id === message.id ? { ...m, choiceMade: option.text } : m,
      ),
    )
    replyAfterDelay(ANYTHING_ELSE_REPLY)
  }

  const inputPlaceholder =
    phase === 'name'
      ? 'Type your name...'
      : phase === 'email'
        ? 'Type your email...'
        : phase === 'active'
          ? 'Ask me anything...'
          : 'Write a message'

  if (phase === 'loading') return <ZoomChatLoading />

  return (
    <div className="flex h-full flex-col bg-white text-black">
      <ZoomChatHeader onClose={onClose} />
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
      >
        {messages.map((message) => (
          <ZoomChatMessage
            key={message.id}
            message={message}
            onJoinMeeting={handleJoinMeeting}
            onSuggestionClick={handleSuggestionClick}
            onCtaClick={onOpenGmail}
            onMultipleChoiceSelect={handleMultipleChoiceSelect}
            pendingFollowUpMessageId={pendingFollowUpMessageId}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/40"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 border-t border-black/10 px-3 py-2.5"
      >
        <button
          type="button"
          aria-label="Attach file"
          className="shrink-0 text-black/50 hover:text-black"
        >
          📎
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          className="flex-1 rounded-full bg-black/5 px-3.5 py-2 text-sm text-black placeholder-black/40 outline-none"
        />
        <button
          type="button"
          aria-label="Add emoji"
          className="shrink-0 text-black/50 hover:text-black"
        >
          🙂
        </button>
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 text-black hover:bg-black/20"
        >
          &uarr;
        </button>
      </form>
      <p className="shrink-0 px-4 pb-3 text-center text-[11px] text-black/40">
        This is a demo assistant — nothing you type here is stored or sent
        anywhere.
      </p>
    </div>
  )
}

export default ZoomChatApp
