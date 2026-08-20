import { useCallback, useEffect, useRef, useState } from 'react'
import FlappyBirdCanvas from './FlappyBirdCanvas.jsx'
import gameOverCard from './assets/components/game over.png'
import startPrompt from './assets/components/start.png'
import backgroundMusic from './assets/audio/flappy bird audio.mp3'
import gameOverSound from './assets/audio/game over.mp3'
import jumpSound from './assets/audio/jump.mp3'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'flappy-bird'

// Percentages of the 400x600 game-over card art (measured in px, then
// converted to %) so the score/best text and the Replay/Exit hit areas stay
// aligned with the art baked into the image as the card scales at any
// viewport size.
const SCORE_SLOT = { x: (111 / 400) * 100, y: (290 / 600) * 100 }
const BEST_SLOT = { x: (299 / 400) * 100, y: (290 / 600) * 100 }
const REPLAY_RECT = {
  left: (74 / 400) * 100,
  top: (352 / 600) * 100,
  width: (119 / 400) * 100,
  height: (37 / 600) * 100,
}
const EXIT_RECT = {
  left: (211 / 400) * 100,
  top: (351 / 600) * 100,
  width: (119 / 400) * 100,
  height: (39 / 600) * 100,
}

export default function FlappyBirdGame({ onExit }) {
  const { submitScore, getTopScores, soundMuted } = useGames()
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
    if (phase === 'playing' && !soundMuted) {
      bgMusicRef.current?.play().catch(() => {})
    } else {
      bgMusicRef.current?.pause()
      if (phase !== 'playing' && bgMusicRef.current)
        bgMusicRef.current.currentTime = 0
    }
    if (phase === 'game-over' && !soundMuted) {
      gameOverAudioRef.current?.play().catch(() => {})
    }
  }, [phase, soundMuted])

  const handleStart = useCallback(() => {
    if (jumpAudioRef.current && !soundMuted) {
      jumpAudioRef.current.currentTime = 0
      jumpAudioRef.current.play().catch(() => {})
    }
    setPhase('playing')
  }, [soundMuted])

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
  }, [phase, handleStart])

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
          <div className="relative aspect-[400/600] max-h-full w-full max-w-[400px]">
            <img
              src={gameOverCard}
              alt="Game Over"
              className="absolute inset-0 h-full w-full"
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#2b1608]"
              style={{ left: `${SCORE_SLOT.x}%`, top: `${SCORE_SLOT.y}%` }}
            >
              {score}
            </span>
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#2b1608]"
              style={{ left: `${BEST_SLOT.x}%`, top: `${BEST_SLOT.y}%` }}
            >
              {bestScore}
            </span>
            <button
              type="button"
              aria-label="Replay"
              onClick={handleReplay}
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
              onClick={() => onExit?.()}
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
      )}
    </div>
  )
}
