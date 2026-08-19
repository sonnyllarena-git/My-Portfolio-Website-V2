import { useRef, useState } from 'react'
import {
  calculateWPM,
  calculateAccuracy,
} from '../../../utils/games/typingStats.js'

export default function TypingTestArea({ snippet, onComplete }) {
  const [typed, setTyped] = useState('')
  const startTimeRef = useRef(null)

  function handleChange(event) {
    const value = event.target.value
    if (value.length > snippet.length) return

    if (startTimeRef.current === null && value.length > 0) {
      startTimeRef.current = performance.now()
    }
    setTyped(value)

    if (value.length === snippet.length) {
      const elapsedMs = performance.now() - startTimeRef.current
      let correctChars = 0
      for (let i = 0; i < snippet.length; i += 1) {
        if (value[i] === snippet[i]) correctChars += 1
      }
      onComplete({
        wpm: calculateWPM(snippet.length, elapsedMs),
        accuracy: calculateAccuracy(correctChars, snippet.length),
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-lg bg-white/5 p-4 font-mono text-lg leading-relaxed">
        {snippet.split('').map((char, index) => {
          let className = 'text-gray-500'
          if (index < typed.length) {
            className =
              typed[index] === char
                ? 'text-green-400'
                : 'text-red-400 underline'
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          )
        })}
      </p>
      <input
        type="text"
        value={typed}
        onChange={handleChange}
        autoFocus
        className="rounded-lg border border-white/10 bg-[#141414] px-4 py-2 text-white outline-none focus:border-white/30"
        placeholder="Start typing..."
      />
    </div>
  )
}
