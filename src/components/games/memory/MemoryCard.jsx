import { motion } from 'framer-motion'

export default function MemoryCard({ card, onFlip }) {
  const isRevealed = card.isFlipped || card.isMatched

  return (
    <button
      type="button"
      disabled={isRevealed}
      onClick={() => onFlip(card.id)}
      className="aspect-square"
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0 rounded-lg border border-white/10 bg-[#141414] transition-colors hover:border-white/30"
          style={{ backfaceVisibility: 'hidden' }}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg border p-2 ${
            card.isMatched
              ? 'border-emerald-400/60 bg-emerald-400/10'
              : 'border-white/20 bg-white/10'
          } ${card.isBonus ? 'ring-2 ring-amber-400' : ''}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img
            src={card.icon}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
      </motion.div>
    </button>
  )
}
