import gameOverCard from './assets/components/typing game over.png'

// Pixel rects measured directly off typing game over.png (a 600x600 card)
// so the score/level text and the Replay/Exit hit areas line up with the
// art baked into the image, matching FlappyBirdGame.jsx's existing pattern.
const SCORE_SLOT = { x: 456, y: 272 }
const LEVEL_SLOT = { x: 456, y: 314 }
const REPLAY_RECT = { left: 74, top: 470, width: 209, height: 45 }
const EXIT_RECT = { left: 314, top: 470, width: 206, height: 43 }

export default function TypingGameOverOverlay({
  score,
  level,
  onReplay,
  onExit,
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
      <div className="relative h-[600px] w-[600px] max-h-full max-w-full">
        <img
          src={gameOverCard}
          alt="Game Over"
          className="absolute inset-0 h-full w-full"
        />
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white"
          style={{ left: SCORE_SLOT.x, top: SCORE_SLOT.y }}
        >
          {score}
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white"
          style={{ left: LEVEL_SLOT.x, top: LEVEL_SLOT.y }}
        >
          {level}
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
