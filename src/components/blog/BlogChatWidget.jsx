import { useEffect, useRef, useState } from 'react'
import { useBlog } from '../../context/BlogContext.jsx'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import {
  SUGGESTED_QUESTIONS,
  ANYTHING_ELSE_REPLY,
  CONTACT_CTA,
} from '../../data/zoomChatKnowledgeBase.js'
import {
  getAutoReply,
  getBotReply,
  getFollowUp,
  getTimeBasedGreeting,
} from '../../utils/zoomChatBot.js'
import { iconImages } from '../../assets/icons/index.js'
import sendIcon from './assets/icons/send icon.png'
import BlogChatButton from './BlogChatButton.jsx'
import BlogChatMessage from './BlogChatMessage.jsx'
import ZoomChatEmojiPicker from '../zoomChat/ZoomChatEmojiPicker.jsx'

const REPLY_DELAY_MS = 500
const TIMESTAMP_GAP_MS = 60000

let idCounter = 0
function makeMessage(role, content, extra = {}) {
  idCounter += 1
  return { id: idCounter, role, content, timestamp: new Date(), ...extra }
}

function BlogChatWidget({ onOpenGmail }) {
  const { visitorName } = useBlog()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [pendingFollowUpMessageId, setPendingFollowUpMessageId] = useState(null)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const scrollRef = useRef(null)
  const pendingFollowUpRef = useRef(null)
  const consecutiveMissesRef = useRef(0)
  const emojiButtonRef = useRef(null)

  function appendMessage(msg) {
    setMessages((prev) => [...prev, msg])
  }

  useEffect(() => {
    if (!isOpen) return
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    if (!emojiPickerOpen) return
    function handleClickOutside(e) {
      if (!emojiButtonRef.current?.contains(e.target)) {
        setEmojiPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [emojiPickerOpen])

  function handleEmojiSelect(emoji) {
    setInput((prev) => prev + emoji)
    setEmojiPickerOpen(false)
  }

  function replyAfterDelay(content, extra = {}) {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      appendMessage(makeMessage('bot', content, extra))
    }, REPLY_DELAY_MS)
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

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setInput('')
    appendMessage(makeMessage('guest', trimmed))
    respondActive(trimmed)
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

  function handleToggle() {
    const opening = !isOpen
    setIsOpen(opening)
    if (opening && messages.length === 0) {
      appendMessage(
        makeMessage('bot', getTimeBasedGreeting(visitorName), {
          suggestions: SUGGESTED_QUESTIONS,
        }),
      )
    }
  }

  function handleMinimize() {
    setIsOpen(false)
  }

  function handleClose() {
    setIsOpen(false)
    setMessages([])
    setPendingFollowUpMessageId(null)
    pendingFollowUpRef.current = null
    consecutiveMissesRef.current = 0
  }

  return (
    <div className="pointer-events-auto absolute right-4 bottom-4 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${
            isMobile
              ? 'h-[65vh] w-[calc(100vw-2rem)] max-w-sm'
              : 'h-[440px] w-80'
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <img
                src={iconImages.blog}
                alt=""
                className="h-9 w-9 rounded-full border border-slate-200"
              />
              <span className="font-semibold text-slate-900">Sonny</span>
              <span className="text-xs text-[#1877F2]">&#9662;</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleMinimize}
                aria-label="Minimize"
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#1877F2] hover:bg-slate-100"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-[#1877F2] hover:bg-slate-100"
              >
                &times;
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-2 overflow-y-auto px-4 py-3"
          >
            {messages.map((message, index) => (
              <BlogChatMessage
                key={message.id}
                message={message}
                showTimestamp={
                  index === 0 ||
                  message.timestamp - messages[index - 1].timestamp >
                    TIMESTAMP_GAP_MS
                }
                onSuggestionClick={handleSuggestionClick}
                onCtaClick={onOpenGmail}
                onMultipleChoiceSelect={handleMultipleChoiceSelect}
                pendingFollowUpMessageId={pendingFollowUpMessageId}
              />
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-slate-200 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 px-3 pb-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Aa"
                  aria-label="Type a message"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                />
                <div ref={emojiButtonRef} className="relative shrink-0">
                  <button
                    type="button"
                    aria-label="Add emoji"
                    onClick={() => setEmojiPickerOpen((open) => !open)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-sm"
                  >
                    🙂
                  </button>
                  {emojiPickerOpen && (
                    <ZoomChatEmojiPicker onSelect={handleEmojiSelect} />
                  )}
                </div>
              </div>
              <button
                type="submit"
                aria-label="Send message"
                className="shrink-0"
              >
                <img src={sendIcon} alt="" className="h-7 w-7" />
              </button>
            </form>
          </div>
        </div>
      )}
      <BlogChatButton onClick={handleToggle} isOpen={isOpen} />
    </div>
  )
}

export default BlogChatWidget
