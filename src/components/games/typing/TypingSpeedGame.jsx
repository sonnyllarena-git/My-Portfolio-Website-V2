import { useState } from 'react'
import TypingTestArea from './TypingTestArea.jsx'
import GameLeaderboard from '../GameLeaderboard.jsx'
import { typingSnippets } from '../../../data/typingSnippets.js'
import { useGames } from '../../../context/GamesContext.jsx'

const GAME_ID = 'typing-speed'

function randomSnippet() {
  return typingSnippets[Math.floor(Math.random() * typingSnippets.length)]
}

export default function TypingSpeedGame() {
  const { submitScore } = useGames()
  const [snippet, setSnippet] = useState(randomSnippet)
  const [runKey, setRunKey] = useState(0)
  const [result, setResult] = useState(null)

  function handleComplete({ wpm, accuracy }) {
    setResult({ wpm, accuracy })
    submitScore(GAME_ID, {
      value: wpm,
      label: `${accuracy}% accuracy`,
      sortOrder: 'desc',
    })
  }

  function handleTryAgain() {
    setSnippet(randomSnippet())
    setResult(null)
    setRunKey((key) => key + 1)
  }

  if (result) {
    return (
      <div className="flex h-full flex-col items-center gap-4 overflow-y-auto bg-[#0d0d0d] p-6 text-center">
        <h2 className="text-xl font-bold text-white">Results</h2>
        <p className="text-3xl font-bold text-white">{result.wpm} WPM</p>
        <p className="text-sm text-gray-400">{result.accuracy}% accuracy</p>
        <button
          type="button"
          onClick={handleTryAgain}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
        >
          Try Again
        </button>
        <div className="w-full max-w-xs">
          <GameLeaderboard
            gameId={GAME_ID}
            scoreLabel="Best WPM"
            sortOrder="desc"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      key={runKey}
      className="flex h-full flex-col items-center justify-center gap-6 bg-[#0d0d0d] p-6"
    >
      <h2 className="text-xl font-bold text-white">Typing Speed Test</h2>
      <div className="w-full max-w-xl">
        <TypingTestArea snippet={snippet} onComplete={handleComplete} />
      </div>
    </div>
  )
}
