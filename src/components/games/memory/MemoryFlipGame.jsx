import { useEffect, useRef, useState } from 'react'
import MemoryCard from './MemoryCard.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import { useGames } from '../../../context/GamesContext.jsx'
import { buildShuffledDeck } from '../../../utils/games/memoryDeck.js'
import { memoryCardIcons } from '../../../data/memoryCardIcons.js'

const GAME_ID = 'memory-flip'
const MISMATCH_DELAY_MS = 800

export default function MemoryFlipGame() {
  const { submitScore } = useGames()
  const [deck, setDeck] = useState(() => buildShuffledDeck(memoryCardIcons))
  const [flippedIds, setFlippedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const timeoutRef = useRef(null)

  const isComplete = deck.every((card) => card.isMatched)

  useEffect(() => {
    if (startTime === null || isComplete) return
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startTime)
    }, 100)
    return () => clearInterval(interval)
  }, [startTime, isComplete])

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
        const finalElapsedMs = Date.now() - startTime
        setElapsedMs(finalElapsedMs)
        submitScore(GAME_ID, {
          value: Math.round(finalElapsedMs / 1000),
          sortOrder: 'asc',
        })
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setDeck((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        )
        setFlippedIds([])
      }, MISMATCH_DELAY_MS)
    }
  }

  function handlePlayAgain() {
    setDeck(buildShuffledDeck(memoryCardIcons))
    setFlippedIds([])
    setMoves(0)
    setStartTime(null)
    setElapsedMs(0)
  }

  if (isComplete) {
    return (
      <div className="flex h-full flex-col items-center gap-4 overflow-y-auto bg-[#0d0d0d] p-6 text-center">
        <h2 className="text-xl font-bold text-white">Solved!</h2>
        <p className="text-3xl font-bold text-white">
          {(elapsedMs / 1000).toFixed(1)}s
        </p>
        <p className="text-sm text-gray-400">{moves} moves</p>
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
            scoreLabel="Fastest Time"
            sortOrder="asc"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 bg-[#0d0d0d] p-6">
      <div className="flex w-full max-w-md items-center justify-between text-white">
        <h2 className="text-xl font-bold">Memory Flip</h2>
        <div className="flex gap-4 text-sm text-gray-300">
          <span>Moves: {moves}</span>
          <span>Time: {(elapsedMs / 1000).toFixed(1)}s</span>
        </div>
      </div>
      <div className="grid w-full max-w-md grid-cols-4 gap-3">
        {deck.map((card) => (
          <MemoryCard key={card.id} card={card} onFlip={handleFlip} />
        ))}
      </div>
    </div>
  )
}
