import { useEffect, useRef, useState } from 'react'
import MemoryCard from './MemoryCard.jsx'
import MemoryHud from './MemoryHud.jsx'
import MemoryGameOverOverlay from './MemoryGameOverOverlay.jsx'
import { useGames } from '../../../context/GamesContext.jsx'
import {
  buildShuffledDeck,
  pickRandomIcons,
} from '../../../utils/games/memoryDeck.js'
import { boardPairsForLevel } from '../../../utils/games/memoryLevels.js'
import { memoryCardIcons } from '../../../data/memoryCardIcons.js'
import flipCardSound from './assets/audio/flip card.MP3'
import correctSound from './assets/audio/correct.MP3'
import wrongSound from './assets/audio/wrong.MP3'
import backgroundMusic from './assets/audio/flip background music.mp3'
import gameBackground from './assets/components/game background.jpg'

const GAME_ID = 'memory-flip'
const MISMATCH_DELAY_MS = 800
const STARTING_LIVES = 5

function buildLevelDeck(level) {
  const pairCount = boardPairsForLevel(level, memoryCardIcons.length)
  return buildShuffledDeck(pickRandomIcons(memoryCardIcons, pairCount))
}

function playSound(ref) {
  if (!ref.current) return
  ref.current.currentTime = 0
  ref.current.play().catch(() => {})
}

export default function MemoryFlipGame({ onExit }) {
  const { submitScore, getTopScores, getTotalPlays } = useGames()
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(STARTING_LIVES)
  const [deck, setDeck] = useState(() => buildLevelDeck(1))
  const [flippedIds, setFlippedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timeoutRef = useRef(null)
  const flipSoundRef = useRef(null)
  const correctSoundRef = useRef(null)
  const wrongSoundRef = useRef(null)

  const isComplete = deck.every((card) => card.isMatched)
  const isGameOver = lives <= 0
  const columns = Math.min(8, Math.max(2, Math.round(Math.sqrt(deck.length))))

  useEffect(() => {
    if (startTime === null || isComplete || isGameOver) return
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTime)
    }, 100)
    return () => clearInterval(interval)
  }, [startTime, isComplete, isGameOver])

  useEffect(() => {
    flipSoundRef.current = new Audio(flipCardSound)
    correctSoundRef.current = new Audio(correctSound)
    wrongSoundRef.current = new Audio(wrongSound)
    return () => {
      clearTimeout(timeoutRef.current)
      flipSoundRef.current?.pause()
      correctSoundRef.current?.pause()
      wrongSoundRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    const music = new Audio(backgroundMusic)
    music.loop = true
    music.play().catch(() => {})
    return () => {
      music.pause()
    }
  }, [])

  function handleFlip(id) {
    if (flippedIds.length === 2) return
    if (startTime === null) setStartTime(Date.now())

    const nextDeck = deck.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    )
    setDeck(nextDeck)
    playSound(flipSoundRef)
    const nextFlipped = [...flippedIds, id]
    setFlippedIds(nextFlipped)

    if (nextFlipped.length !== 2) return

    setMoves((prevMoves) => prevMoves + 1)
    const [firstId, secondId] = nextFlipped
    const first = nextDeck.find((card) => card.id === firstId)
    const second = nextDeck.find((card) => card.id === secondId)

    if (first.icon === second.icon) {
      playSound(correctSoundRef)
      const matchedDeck = nextDeck.map((card) =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card,
      )
      setDeck(matchedDeck)
      setFlippedIds([])

      if (matchedDeck.every((card) => card.isMatched)) {
        const nextLevel = level + 1
        setLevel(nextLevel)
        setDeck(buildLevelDeck(nextLevel))
        setMoves(0)
        setStartTime(null)
        setElapsedMs(0)
      }
    } else {
      playSound(wrongSoundRef)
      timeoutRef.current = setTimeout(() => {
        const nextLives = lives - 1
        setLives(nextLives)
        setDeck((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        )
        setFlippedIds([])

        if (nextLives <= 0) {
          submitScore(GAME_ID, { value: level - 1, sortOrder: 'desc' })
        }
      }, MISMATCH_DELAY_MS)
    }
  }

  function handlePlayAgain() {
    setLevel(1)
    setLives(STARTING_LIVES)
    setDeck(buildLevelDeck(1))
    setFlippedIds([])
    setMoves(0)
    setStartTime(null)
    setElapsedMs(0)
  }

  return (
    <div
      className="relative flex h-full flex-col items-center gap-4 bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${gameBackground})` }}
    >
      <MemoryHud
        level={level}
        lives={lives}
        moves={moves}
        elapsedMs={elapsedMs}
        bestScore={getTopScores(GAME_ID)[0]?.value}
        totalPlays={getTotalPlays(GAME_ID)}
      />
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          width: `${columns * 100}px`,
          maxWidth: '100%',
        }}
      >
        {deck.map((card) => (
          <MemoryCard key={card.id} card={card} onFlip={handleFlip} />
        ))}
      </div>
      {isGameOver && (
        <MemoryGameOverOverlay
          score={level - 1}
          onReplay={handlePlayAgain}
          onExit={() => onExit?.()}
        />
      )}
    </div>
  )
}
