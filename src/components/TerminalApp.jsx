import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  'Sonny Window [ Version 10.0.239495.090 ]',
  '(C) Sonny Corporation. All rights reserved.',
  '',
  'Type /help for command',
]
const PROMPT = 'C:\\Users\\Guest>'

function TerminalApp() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [history])

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const command = input.trim()
    setHistory((prev) => [
      ...prev,
      `${PROMPT}${input}`,
      ...(command
        ? [`'${command}' is not recognized as an internal or external command.`]
        : []),
    ])
    setInput('')
  }

  return (
    <div
      onMouseDown={() => inputRef.current?.focus()}
      className="h-full overflow-auto whitespace-pre-wrap bg-black px-3 py-2 font-mono text-sm text-gray-200"
    >
      {BOOT_LINES.map((line, index) => (
        <div key={index}>{line || '\u00A0'}</div>
      ))}
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div className="flex">
        <span>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent pl-1 text-gray-200 caret-gray-200 outline-none"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

export default TerminalApp
