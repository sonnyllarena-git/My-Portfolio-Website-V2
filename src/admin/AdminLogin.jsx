import { useState } from 'react'
import logo from '../components/store/assets/components/sonny store logo.png'
import { apiFetch, setToken } from './api.js'
import {
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_LOGIN_BG,
} from './adminTheme.js'

export default function AdminLogin({ onLogin, notice = '' }) {
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
      className={`flex min-h-screen items-center justify-center ${ADMIN_LOGIN_BG}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex w-80 flex-col gap-4 rounded-lg border border-white/10 ${ADMIN_LOGIN_BG} p-6`}
      >
        <img src={logo} alt="Sonny" className="h-7 self-center" />
        <h1 className="text-center text-sm font-semibold text-white">
          Admin sign in
        </h1>
        {notice && (
          <p className="text-center text-sm text-amber-400">{notice}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="rounded border border-transparent bg-white px-3 py-2 text-sm text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded border border-transparent bg-white px-3 py-2 text-sm text-gray-900"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Sign in
        </button>
        <p className="text-center text-xs text-white/60">
          Mock credentials — local practice only.
        </p>
      </form>
    </div>
  )
}
