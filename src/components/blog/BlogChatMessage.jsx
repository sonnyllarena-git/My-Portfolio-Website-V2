import { BRAND_BLUE_MESSAGE_BG } from './theme.js'

function formatTimestamp(date) {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function BlogChatMessage({
  message,
  showTimestamp,
  onSuggestionClick,
  onCtaClick,
  onMultipleChoiceSelect,
  pendingFollowUpMessageId,
}) {
  const isGuest = message.role === 'guest'

  return (
    <div className="flex flex-col gap-2">
      {showTimestamp && (
        <div className="text-center text-xs text-slate-400">
          {formatTimestamp(message.timestamp)}
        </div>
      )}
      <div className={`flex ${isGuest ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`flex max-w-[80%] flex-col ${isGuest ? 'items-end' : 'items-start'}`}
        >
          {message.content && (
            <div
              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                isGuest
                  ? `rounded-br-md text-white ${BRAND_BLUE_MESSAGE_BG}`
                  : 'rounded-bl-md bg-slate-200 text-slate-900'
              }`}
            >
              {message.content}
            </div>
          )}

          {message.cta && (
            <button
              onClick={onCtaClick}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#1877F2] px-3 py-1.5 text-xs font-semibold text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
            >
              {message.cta.label} &rarr;
            </button>
          )}

          {message.suggestions && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.suggestions.map((s) => (
                <button
                  key={s.text}
                  onClick={() => onSuggestionClick(s.text)}
                  className="rounded-full border border-[#1877F2]/40 px-3 py-1.5 text-xs text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                >
                  {s.text}
                </button>
              ))}
            </div>
          )}

          {message.multipleChoice && (
            <div className="mt-2 flex flex-col gap-1.5">
              {message.multipleChoice.options.map((option) => (
                <button
                  key={option.text}
                  disabled={pendingFollowUpMessageId !== message.id}
                  onClick={() => onMultipleChoiceSelect(message, option)}
                  className={`rounded-lg border px-3 py-1.5 text-left text-xs ${
                    message.choiceMade === option.text
                      ? `border-[#1877F2] text-white ${BRAND_BLUE_MESSAGE_BG}`
                      : 'border-slate-300 text-slate-600 hover:border-[#1877F2] hover:text-slate-900 disabled:hover:border-slate-300 disabled:hover:text-slate-600'
                  }`}
                >
                  {option.label}. {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogChatMessage
