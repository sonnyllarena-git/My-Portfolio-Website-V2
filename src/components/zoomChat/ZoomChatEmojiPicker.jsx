const EMOJIS = [
  '😀',
  '😂',
  '😍',
  '😊',
  '👍',
  '🙏',
  '🎉',
  '❤️',
  '😢',
  '😮',
  '🔥',
  '👏',
  '🙌',
  '😅',
  '🤔',
  '😎',
  '💯',
  '✅',
  '🎂',
  '😴',
  '😇',
  '🤝',
  '🚀',
  '👋',
]

function ZoomChatEmojiPicker({ onSelect }) {
  return (
    <div className="absolute bottom-9 left-0 z-10 grid w-60 grid-cols-6 gap-1 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="flex h-8 w-8 items-center justify-center rounded text-lg hover:bg-black/5"
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default ZoomChatEmojiPicker
