import gameOverCard from './assets/components/game over.png'

// Pixel rects measured directly off "game over.png" (a 600x600 card),
// matching TypingGameOverOverlay.jsx's existing pattern.
const SCORE_VALUE_SLOT = { x: 300, y: 243 }
const REPLAY_RECT = { left: 70, top: 272, width: 230, height: 118 }
const EXIT_RECT = { left: 308, top: 272, width: 155, height: 118 }

const OUTLINE_TEXT_SHADOW = [
  '-2px -2px 0 #000',
  '2px -2px 0 #000',
  '-2px 2px 0 #000',
  '2px 2px 0 #000',
  '0 -2px 0 #000',
  '0 2px 0 #000',
  '-2px 0 0 #000',
  '2px 0 0 #000',
].join(', ')

export default function MemoryGameOverOverlay({ score, onReplay, onExit }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
      <div className="relative h-[600px] w-[600px] max-h-full max-w-full">
        <img
          src={gameOverCard}
          alt="Game Over"
          className="absolute inset-0 h-full w-full"
        />
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-yellow-400"
          style={{
            left: SCORE_VALUE_SLOT.x,
            top: SCORE_VALUE_SLOT.y,
            textShadow: OUTLINE_TEXT_SHADOW,
          }}
        >
          {score}
        </span>
        <button
          type="button"
          aria-label="Replay"
          onClick={onReplay}
          className="absolute cursor-pointer"
          style={REPLAY_RECT}
        />
        <button
          type="button"
          aria-label="Exit"
          onClick={onExit}
          className="absolute cursor-pointer"
          style={EXIT_RECT}
        />
      </div>
    </div>
  )
}
