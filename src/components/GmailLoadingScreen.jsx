import { useEffect, useState } from 'react'
import gmailLogo from '../assets/icons/gmail.png'

const LOADING_MS = 2000

function GmailLoadingScreen({ onDone }) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setFilled(true), 20)
    const doneTimeout = setTimeout(onDone, LOADING_MS)
    return () => {
      clearTimeout(startTimeout)
      clearTimeout(doneTimeout)
    }
  }, [onDone])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-white">
      <img src={gmailLogo} alt="" className="h-16 w-16" />
      <div className="h-1.5 w-56 max-w-[50vw] overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400 transition-[width] duration-[2000ms] ease-linear"
          style={{ width: filled ? '100%' : '0%' }}
        />
      </div>
      <p className="text-sm text-gray-500">Signing in…</p>
    </div>
  )
}

export default GmailLoadingScreen
