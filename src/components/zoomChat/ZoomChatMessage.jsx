import zoomAvatar from '../../assets/icons/zoom-avatar.png'

function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function ZoomChatMessage({
  message,
  onJoinMeeting,
  onSuggestionClick,
  onCtaClick,
  onMultipleChoiceSelect,
  pendingFollowUpMessageId,
}) {
  const isGuest = message.role === 'guest'

  return (
    <div className={`flex ${isGuest ? 'justify-end' : 'items-start gap-2'}`}>
      {!isGuest && (
        <img
          src={zoomAvatar}
          alt=""
          className="h-6 w-6 shrink-0 rounded-full"
        />
      )}
      <div
        className={`flex max-w-[80%] flex-col ${isGuest ? 'items-end' : 'items-start'}`}
      >
        {message.joinMeeting ? (
          <button
            onClick={onJoinMeeting}
            className="rounded-full border-2 border-blue-500 bg-white px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Join a meeting
          </button>
        ) : (
          message.content && (
            <div
              className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                isGuest
                  ? 'rounded-br-sm bg-gray-200 text-black'
                  : `rounded-bl-sm border border-black/10 bg-white text-black shadow-sm ${
                      message.isSystem ? 'text-black/50 italic' : ''
                    }`
              }`}
            >
              {message.content}
            </div>
          )
        )}

        {message.cta && (
          <button
            onClick={onCtaClick}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-blue-500 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-500 hover:text-white"
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
                className="rounded-full border border-blue-500/40 px-3 py-1.5 text-xs text-blue-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
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
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-black/15 text-black/70 hover:border-blue-500 hover:text-black disabled:hover:border-black/15 disabled:hover:text-black/70'
                }`}
              >
                {option.label}. {option.text}
              </button>
            ))}
          </div>
        )}

        {message.content && (
          <span className="mt-1 text-[10px] text-black/40">
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  )
}

export default ZoomChatMessage
