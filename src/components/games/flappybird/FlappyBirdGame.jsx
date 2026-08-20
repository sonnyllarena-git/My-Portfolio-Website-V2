import { useEffect, useRef, useState } from 'react'
import FlappyBirdCanvas from './FlappyBirdCanvas.jsx'
import gameOverCard from './assets/components/game over.png'
import startPrompt from './assets/components/start.png'
import backgroundMusic from './assets/audio/flappy bird audio.mp3'
import gameOverSound from './assets/audio/game over.mp3'
import jumpSound from './assets/audio/jump.mp3'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'flappy-bird'

// Pixel rects measured directly off game over.png (a 400x600 card matching
// the canvas 1:1) so the score/best text and the Replay/Exit hit areas line
// up with the art baked into the image.
const SCORE_SLOT = { x: 111, y: 290 }
const BEST_SLOT = { x: 299, y: 290 }
const REPLAY_RECT = { left: 74, top: 352, width: 119, height: 37 }
const EXIT_RECT = { left: 211, top: 351, width: 119, height: 39 }

export default function FlappyBirdGame({ onExit }) {
  const { submitScore, getTopScores } = useGames()
  const [phase, setPhase] = useState('start')
  const [runKey, setRunKey] = useState(0)
  const [score, setScore] = useState(0)
  const bgMusicRef = useRef(null)
  const gameOverAudioRef = useRef(null)
  const jumpAudioRef = useRef(null)

  useEffect(() => {
    bgMusicRef.current = new Audio(backgroundMusic)
    bgMusicRef.current.loop = true
    gameOverAudioRef.current = new Audio(gameOverSound)
    jumpAudioRef.current = new Audio(jumpSound)
    return () => {
      bgMusicRef.current?.pause()
      gameOverAudioRef.current?.pause()
      jumpAudioRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    if (phase === 'playing') {
      bgMusicRef.current?.play().catch(() => {})
    } else {
      bgMusicRef.current?.pause()
      if (bgMusicRef.current) bgMusicRef.current.currentTime = 0
    }
    if (phase === 'game-over') {
      gameOverAudioRef.current?.play().catch(() => {})
    }
  }, [phase])

  function handleStart() {
    if (jumpAudioRef.current) {
      jumpAudioRef.current.currentTime = 0
      jumpAudioRef.current.play().catch(() => {})
    }
    setPhase('playing')
  }

  useEffect(() => {
    if (phase !== 'start') return
    function handleKeydown(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        handleStart()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [phase])

  function handleGameOver(finalScore) {
    setScore(finalScore)
    submitScore(GAME_ID, { value: finalScore, sortOrder: 'desc' })
    setPhase('game-over')
  }

  function handleReplay() {
    setRunKey((key) => key + 1)
    setPhase('playing')
  }

  const bestScore = Math.max(
    score,
    ...getTopScores(GAME_ID).map((entry) => entry.value),
  )

  return (
    <div
      key={runKey}
      className="relative h-full w-full overflow-hidden bg-[#0d0d0d]"
    >
      <FlappyBirdCanvas
        paused={phase === 'start'}
        onGameOver={handleGameOver}
      />
      {phase === 'start' && (
        <div
          onClick={handleStart}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <img
            src={startPrompt}
            alt="Tap the screen to play"
            className="h-[600px] w-[400px] max-h-full max-w-full object-contain"
          />
        </div>
      )}
      {phase === 'game-over' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="relative h-[600px] w-[400px] max-h-full max-w-full">
            <img
              src={gameOverCard}
              alt="Game Over"
              className="absolute inset-0 h-full w-full"
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#2b1608]"
              style={{ left: SCORE_SLOT.x, top: SCORE_SLOT.y }}
            >
              {score}
            </span>
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#2b1608]"
              style={{ left: BEST_SLOT.x, top: BEST_SLOT.y }}
            >
              {bestScore}
            </span>
            <button
              type="button"
              aria-label="Replay"
              onClick={handleReplay}
              className="absolute cursor-pointer"
              style={REPLAY_RECT}
            />
            <button
              type="button"
              aria-label="Exit"
              onClick={() => onExit?.()}
              className="absolute cursor-pointer"
              style={EXIT_RECT}
            />
          </div>
        </div>
      )}
    </div>
  )
}
