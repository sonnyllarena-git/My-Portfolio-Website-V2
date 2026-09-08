import gameOverCard from './assets/components/typing game over.png'

// Percentages of the 600x600 game-over card art (measured in px, then
// converted to %) so the score text and the Replay/Exit hit areas stay
// aligned with the art baked into the image as the card scales at any
// viewport size — matching FlappyBirdGame.jsx's existing pattern.
const SCORE_VALUE_SLOT = { x: (308 / 600) * 100, y: (358 / 600) * 100 }
const REPLAY_RECT = {
  left: (74 / 600) * 100,
  top: (470 / 600) * 100,
  width: (209 / 600) * 100,
  height: (45 / 600) * 100,
}
const EXIT_RECT = {
  left: (314 / 600) * 100,
  top: (470 / 600) * 100,
  width: (206 / 600) * 100,
  height: (43 / 600) * 100,
}

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

export default function TypingGameOverOverlay({ score, onReplay, onExit }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
      <div className="relative aspect-square max-h-full w-full max-w-[600px]">
        <img
          src={gameOverCard}
          alt="Game Over"
          className="absolute inset-0 h-full w-full"
        />
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-yellow-400"
          style={{
            left: `${SCORE_VALUE_SLOT.x}%`,
            top: `${SCORE_VALUE_SLOT.y}%`,
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
          style={{
            left: `${REPLAY_RECT.left}%`,
            top: `${REPLAY_RECT.top}%`,
            width: `${REPLAY_RECT.width}%`,
            height: `${REPLAY_RECT.height}%`,
          }}
        />
        <button
          type="button"
          aria-label="Exit"
          onClick={onExit}
          className="absolute cursor-pointer"
          style={{
            left: `${EXIT_RECT.left}%`,
            top: `${EXIT_RECT.top}%`,
            width: `${EXIT_RECT.width}%`,
            height: `${EXIT_RECT.height}%`,
          }}
        />
      </div>
    </div>
  )
}
