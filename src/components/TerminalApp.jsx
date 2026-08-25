import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'

const BOOT_LINES = [
  'Sonny Windows [ Version 10.0.239495.090 ]',
  '(C) Sonny Corporation. All rights reserved.',
  '',
  'Type /help for command',
]
const PROMPT = 'C:\\Users\\Guest>'
const DOT_INTERVAL_MS = 250
const LOADING_DURATION_MS = 1000
const DOT_CYCLE_MAX = 3

const COMMANDS = [
  { command: '/help', kind: 'help', description: 'List available commands' },
  { command: '/clear', kind: 'clear', description: 'Clear the terminal' },
  {
    command: '/settings',
    kind: 'open',
    appId: 'settings',
    label: 'Settings',
    description: 'Open Settings',
  },
  {
    command: '/resume',
    kind: 'open',
    appId: 'resume',
    label: 'Resume',
    description: 'Open Resume',
  },
  {
    command: '/projects',
    kind: 'open',
    appId: 'projects',
    label: 'Projects',
    description: 'Open Projects',
  },
  {
    command: '/contact',
    kind: 'open',
    appId: 'contact-info',
    label: 'Contact Info',
    description: 'Open Contact Info',
  },
  {
    command: '/store',
    kind: 'open',
    appId: 'store',
    label: 'Store',
    description: 'Open Store',
  },
  {
    command: '/games',
    kind: 'open',
    appId: 'games',
    label: 'Games',
    description: 'Open Games',
  },
  {
    command: '/blog',
    kind: 'open',
    appId: 'blog',
    label: 'Blog',
    description: 'Open Blog',
  },
  {
    command: '/paint',
    kind: 'open',
    appId: 'paint',
    label: 'Paint',
    description: 'Open Paint',
  },
  {
    command: '/musiclab',
    kind: 'open',
    appId: 'music-lab',
    label: 'Music Lab',
    description: 'Open Music Lab',
  },
  {
    command: '/gmail',
    kind: 'open',
    appId: 'gmail',
    label: 'Gmail',
    description: 'Open Gmail',
  },
  {
    command: '/volume',
    kind: 'volume',
    label: 'Volume',
    description: 'Open the volume settings',
  },
]

function findCommand(raw) {
  return COMMANDS.find((c) => c.command === raw)
}

function buildHelpLines() {
  return [
    'Available commands:',
    ...COMMANDS.map((c) => `  ${c.command}  - ${c.description}`),
  ]
}

const TerminalApp = forwardRef(function TerminalApp(
  { onOpenApp = () => {}, isActive = false },
  ref,
) {
  const { setIsVolumeFlyoutOpen } = useSystemSettings()
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loadingLine, setLoadingLine] = useState(null)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [history, loadingLine])

  useEffect(() => {
    if (isActive) inputRef.current?.focus()
  }, [isActive])

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  function dispatchOpen(entry) {
    if (entry.kind === 'volume') {
      setIsVolumeFlyoutOpen(true)
      return
    }
    onOpenApp(entry.appId)
  }

  function runOpenCommand(entry) {
    let dots = 1
    setLoadingLine(`Opening ${entry.label}.`)
    intervalRef.current = setInterval(() => {
      dots = dots === DOT_CYCLE_MAX ? 1 : dots + 1
      setLoadingLine(`Opening ${entry.label}${'.'.repeat(dots)}`)
    }, DOT_INTERVAL_MS)
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current)
      if (!isMountedRef.current) return
      setLoadingLine(null)
      setHistory((prev) => [...prev, `Opening ${entry.label}... done.`])
      dispatchOpen(entry)
    }, LOADING_DURATION_MS)
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter' || loadingLine !== null) return
    const typedLine = input
    const raw = input.trim()
    setInput('')
    if (!raw) {
      setHistory((prev) => [...prev, `${PROMPT}${typedLine}`])
      return
    }
    const entry = findCommand(raw)
    const echoLine = `${PROMPT}${typedLine}`
    if (!entry) {
      setHistory((prev) => [
        ...prev,
        echoLine,
        `'${raw}' is not recognized as an internal or external command.`,
      ])
      return
    }
    if (entry.kind === 'clear') {
      setHistory([])
      return
    }
    if (entry.kind === 'help') {
      setHistory((prev) => [...prev, echoLine, ...buildHelpLines()])
      return
    }
    setHistory((prev) => [...prev, echoLine])
    runOpenCommand(entry)
  }

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault()
        inputRef.current?.focus()
      }}
      className="scrollbar-classic h-full overflow-auto whitespace-pre-wrap bg-black px-3 py-2 font-mono text-sm text-gray-200"
    >
      {BOOT_LINES.map((line, index) => (
        <div key={index}>{line || '\u00A0'}</div>
      ))}
      {history.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      {loadingLine !== null && <div>{loadingLine}</div>}
      <div className="flex">
        <span>{PROMPT}</span>
        <div className="relative flex-1">
          <span aria-hidden="true" className="pl-1">
            {input}
            {loadingLine === null && <span className="terminal-cursor">_</span>}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loadingLine !== null}
            autoFocus
            spellCheck={false}
            className="absolute inset-0 w-full bg-transparent pl-1 text-transparent caret-transparent outline-none"
          />
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  )
})

export default TerminalApp
