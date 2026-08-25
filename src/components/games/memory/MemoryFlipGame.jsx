import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MemoryCard from './MemoryCard.jsx'
import MemoryHud from './MemoryHud.jsx'
import MemoryGameOverOverlay from './MemoryGameOverOverlay.jsx'
import { useGames } from '../../../context/GamesContext.jsx'
import { useSystemSettings } from '../../../context/SystemSettingsContext.jsx'
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
const STARTING_LIVES = 10
const BONUS_START_LEVEL = 5
const TOAST_DURATION_MS = 1300

function buildLevelDeck(level) {
  const pairCount = boardPairsForLevel(level, memoryCardIcons.length)
  const icons = pickRandomIcons(memoryCardIcons, pairCount)
  const deck = buildShuffledDeck(icons)
  if (level < BONUS_START_LEVEL) return deck

  const bonusIcon = icons[Math.floor(Math.random() * icons.length)]
  return deck.map((card) =>
    card.icon === bonusIcon ? { ...card, isBonus: true } : card,
  )
}

function playSound(ref, muted) {
  if (!ref.current || muted) return
  ref.current.currentTime = 0
  ref.current.play().catch(() => {})
}

export default function MemoryFlipGame({ onExit }) {
  const { submitScore, soundMuted } = useGames()
  const { volume, isMuted } = useSystemSettings()
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(STARTING_LIVES)
  const [deck, setDeck] = useState(() => buildLevelDeck(1))
  const [flippedIds, setFlippedIds] = useState([])
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)
  const toastTimeoutRef = useRef(null)
  const toastIdRef = useRef(0)
  const flipSoundRef = useRef(null)
  const correctSoundRef = useRef(null)
  const wrongSoundRef = useRef(null)
  const musicRef = useRef(null)

  function showToast(text) {
    toastIdRef.current += 1
    setToast({ id: toastIdRef.current, text })
    clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(
      () => setToast(null),
      TOAST_DURATION_MS,
    )
  }

  function gainLife() {
    setLives((prevLives) => Math.min(prevLives + 1, STARTING_LIVES))
  }

  const isGameOver = lives <= 0
  const columns = Math.min(8, Math.max(2, Math.round(Math.sqrt(deck.length))))

  useEffect(() => {
    flipSoundRef.current = new Audio(flipCardSound)
    correctSoundRef.current = new Audio(correctSound)
    wrongSoundRef.current = new Audio(wrongSound)
    return () => {
      clearTimeout(timeoutRef.current)
      clearTimeout(toastTimeoutRef.current)
      flipSoundRef.current?.pause()
      correctSoundRef.current?.pause()
      wrongSoundRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    const music = new Audio(backgroundMusic)
    music.loop = true
    musicRef.current = music
    return () => {
      music.pause()
    }
  }, [])

  useEffect(() => {
    if (!musicRef.current) return
    if (soundMuted) musicRef.current.pause()
    else musicRef.current.play().catch(() => {})
  }, [soundMuted])

  useEffect(() => {
    const effective = soundMuted || isMuted ? 0 : volume / 100
    ;[flipSoundRef, correctSoundRef, wrongSoundRef, musicRef].forEach((ref) => {
      if (ref.current) ref.current.volume = effective
    })
  }, [volume, isMuted, soundMuted])

  function handleFlip(id) {
    if (flippedIds.length === 2) return

    const nextDeck = deck.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    )
    setDeck(nextDeck)
    playSound(flipSoundRef, soundMuted)
    const nextFlipped = [...flippedIds, id]
    setFlippedIds(nextFlipped)

    if (nextFlipped.length !== 2) return

    const [firstId, secondId] = nextFlipped
    const first = nextDeck.find((card) => card.id === firstId)
    const second = nextDeck.find((card) => card.id === secondId)

    if (first.icon === second.icon) {
      playSound(correctSoundRef, soundMuted)
      const matchedDeck = nextDeck.map((card) =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card,
      )
      setDeck(matchedDeck)
      setFlippedIds([])

      if (first.isBonus) {
        gainLife()
        showToast('BONUS +1 FLIP')
      }

      if (matchedDeck.every((card) => card.isMatched)) {
        const nextLevel = level + 1
        setLevel(nextLevel)
        setDeck(buildLevelDeck(nextLevel))
        gainLife()
        showToast('+1 FLIP')
      }
    } else {
      playSound(wrongSoundRef, soundMuted)
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
  }

  return (
    <div
      className="relative flex h-full flex-col items-center gap-4 bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${gameBackground})` }}
    >
      <MemoryHud level={level} lives={lives} maxLives={STARTING_LIVES} />
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 z-20 rounded-full bg-emerald-500 px-4 py-1 text-sm font-bold text-white shadow-lg"
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-1 items-center justify-center">
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
