import { useEffect, useRef, useState } from 'react'
import MemoryCard from './MemoryCard.jsx'
import MemoryHud from './MemoryHud.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import { useGames } from '../../../context/GamesContext.jsx'
import {
  buildShuffledDeck,
  pickRandomIcons,
} from '../../../utils/games/memoryDeck.js'
import { boardPairsForLevel } from '../../../utils/games/memoryLevels.js'
import { memoryCardIcons } from '../../../data/memoryCardIcons.js'

const GAME_ID = 'memory-flip'
const MISMATCH_DELAY_MS = 800
const STARTING_LIVES = 5

function buildLevelDeck(level) {
  const pairCount = boardPairsForLevel(level, memoryCardIcons.length)
  return buildShuffledDeck(pickRandomIcons(memoryCardIcons, pairCount))
}

export default function MemoryFlipGame() {
  const { submitScore, getTopScores, getTotalPlays } = useGames()
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(STARTING_LIVES)
  const [deck, setDeck] = useState(() => buildLevelDeck(1))
  const [flippedIds, setFlippedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timeoutRef = useRef(null)

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
    return () => clearTimeout(timeoutRef.current)
  }, [])

  function handleFlip(id) {
    if (flippedIds.length === 2) return
    if (startTime === null) setStartTime(Date.now())

    const nextDeck = deck.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    )
    setDeck(nextDeck)
    const nextFlipped = [...flippedIds, id]
    setFlippedIds(nextFlipped)

    if (nextFlipped.length !== 2) return

    setMoves((prevMoves) => prevMoves + 1)
    const [firstId, secondId] = nextFlipped
    const first = nextDeck.find((card) => card.id === firstId)
    const second = nextDeck.find((card) => card.id === secondId)

    if (first.icon === second.icon) {
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

  if (isGameOver) {
    return (
      <div className="flex h-full flex-col items-center gap-4 overflow-y-auto bg-[#0d0d0d] p-6 text-center">
        <h2 className="text-xl font-bold text-white">Game Over</h2>
        <p className="text-3xl font-bold text-white">{level - 1}</p>
        <p className="text-sm text-gray-400">levels cleared</p>
        <button
          type="button"
          onClick={handlePlayAgain}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
        >
          Play Again
        </button>
        <div className="w-full max-w-xs">
          <GameLeaderboard
            gameId={GAME_ID}
            scoreLabel="Highest Level"
            sortOrder="desc"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 bg-[#0d0d0d] p-6">
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
    </div>
  )
}
