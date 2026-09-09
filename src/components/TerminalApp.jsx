import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useSystemSettings } from '../context/SystemSettingsContext.jsx'
import { contactInfo } from '../data/contactInfo.js'
import { apiFetch, setToken } from '../admin/api.js'

const SOCIAL_URLS = Object.fromEntries(
  contactInfo.profiles.map((p) => [p.kind, p.url]),
)

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
  {
    command: '/techstack',
    kind: 'open',
    appId: 'tech-stack',
    label: 'Tech Stack',
    description: 'Open Tech Stack',
  },
  {
    command: '/aichat',
    kind: 'open',
    appId: 'zoom-chat',
    label: 'Zoom Chat',
    description: 'Open AI Chat',
  },
  {
    command: '/sonnyfacebook',
    kind: 'link',
    url: SOCIAL_URLS.facebook,
    label: 'Facebook',
    description: "Open Sonny's Facebook profile",
  },
  {
    command: '/sonnyyoutube',
    kind: 'link',
    url: SOCIAL_URLS.youtube,
    label: 'YouTube',
    description: "Open Sonny's YouTube channel",
  },
  {
    command: '/sonnylinkedin',
    kind: 'link',
    url: SOCIAL_URLS.linkedin,
    label: 'LinkedIn',
    description: "Open Sonny's LinkedIn profile",
  },
  {
    command: '/sonnytiktok',
    kind: 'link',
    url: SOCIAL_URLS.tiktok,
    label: 'TikTok',
    description: "Open Sonny's TikTok profile",
  },
  {
    command: '/sleep',
    kind: 'power',
    action: 'sleep',
    label: 'Sleeping',
    description: 'Put the system to sleep',
  },
  {
    command: '/restart',
    kind: 'power',
    action: 'restart',
    label: 'Restarting',
    description: 'Restart the system',
  },
  {
    command: '/shutdown',
    kind: 'power',
    action: 'shutdown',
    label: 'Shutting down',
    description: 'Shut down the system',
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
  { onOpenApp = () => {}, onPowerAction = () => {}, isActive = false },
  ref,
) {
  const { setIsVolumeFlyoutOpen } = useSystemSettings()
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loadingLine, setLoadingLine] = useState(null)
  // Hidden `/admin` login flow — deliberately not in COMMANDS, so it never appears in /help.
  const [authStep, setAuthStep] = useState(null) // null | 'username' | 'password' | 'authenticating'
  const [pendingUsername, setPendingUsername] = useState('')
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
    if (entry.kind === 'link') {
      window.open(entry.url, '_blank', 'noopener,noreferrer')
      return
    }
    if (entry.kind === 'power') {
      onPowerAction(entry.action)
      return
    }
    onOpenApp(entry.appId)
  }

  function runOpenCommand(entry) {
    const phrase =
      entry.kind === 'power' ? entry.label : `Opening ${entry.label}`
    let dots = 1
    setLoadingLine(`${phrase}.`)
    intervalRef.current = setInterval(() => {
      dots = dots === DOT_CYCLE_MAX ? 1 : dots + 1
      setLoadingLine(`${phrase}${'.'.repeat(dots)}`)
    }, DOT_INTERVAL_MS)
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current)
      if (!isMountedRef.current) return
      setLoadingLine(null)
      setHistory((prev) => [...prev, `${phrase}... done.`])
      dispatchOpen(entry)
    }, LOADING_DURATION_MS)
  }

  function handleAdminLogin(username, password) {
    setAuthStep('authenticating')
    apiFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then(({ token }) => {
        setToken(token)
        if (!isMountedRef.current) return
        setHistory((prev) => [...prev, 'Login successful.'])
        setAuthStep(null)
        setPendingUsername('')
        onOpenApp('admin-panel')
      })
      .catch(() => {
        if (!isMountedRef.current) return
        setHistory((prev) => [
          ...prev,
          'Login failed: incorrect username or password.',
        ])
        setAuthStep(null)
        setPendingUsername('')
      })
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter' || loadingLine !== null) return
    const typedLine = input
    const raw = input.trim()
    setInput('')

    if (authStep === 'username') {
      setPendingUsername(raw)
      setHistory((prev) => [
        ...prev,
        `${PROMPT}${'*'.repeat(typedLine.length)}`,
        'Password:',
      ])
      setAuthStep('password')
      return
    }
    if (authStep === 'password') {
      setHistory((prev) => [
        ...prev,
        `${PROMPT}${'*'.repeat(typedLine.length)}`,
      ])
      handleAdminLogin(pendingUsername, raw)
      return
    }

    if (!raw) {
      setHistory((prev) => [...prev, `${PROMPT}${typedLine}`])
      return
    }
    const echoLine = `${PROMPT}${typedLine}`
    if (raw === '/admin') {
      // Always prompts fresh — never skips login even if a token already exists.
      setHistory((prev) => [...prev, echoLine, 'Username:'])
      setAuthStep('username')
      return
    }
    const entry = findCommand(raw)
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
            {authStep === 'password' || authStep === 'username'
              ? '*'.repeat(input.length)
              : input}
            {loadingLine === null && authStep !== 'authenticating' && (
              <span className="terminal-cursor">_</span>
            )}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loadingLine !== null || authStep === 'authenticating'}
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
