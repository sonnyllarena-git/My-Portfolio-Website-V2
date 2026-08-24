import { useState } from 'react'
import logo from '../components/store/assets/components/sonny store logo.png'
import { apiFetch, setToken } from './api.js'
import {
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_BODY_TEXT,
  ADMIN_SECONDARY_TEXT,
  ADMIN_CARD_BORDER,
  ADMIN_PAGE_BG,
} from './adminTheme.js'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      const { token } = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      setToken(token)
      onLogin()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${ADMIN_PAGE_BG}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex w-80 flex-col gap-4 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-6`}
      >
        <img src={logo} alt="Sonny" className="h-7 self-center" />
        <h1 className={`text-center text-sm font-semibold ${ADMIN_BODY_TEXT}`}>
          Admin sign in
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Sign in
        </button>
        <p className={`text-center text-xs ${ADMIN_SECONDARY_TEXT}`}>
          Mock credentials — local practice only.
        </p>
      </form>
    </div>
  )
}
