export default function MemoryCard({ card, onFlip }) {
  const isRevealed = card.isFlipped || card.isMatched
  const disabled = isRevealed

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onFlip(card.id)}
      className={`flex aspect-square items-center justify-center rounded-lg border text-3xl transition-colors ${
        isRevealed
          ? 'border-white/20 bg-white/10'
          : 'border-white/10 bg-[#141414] hover:border-white/30'
      }`}
    >
      {isRevealed ? card.icon : ''}
    </button>
  )
}
