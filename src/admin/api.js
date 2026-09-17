import { fetchWithTimeout } from '../utils/fetchWithTimeout.js'

const TOKEN_KEY = 'adminToken'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function logout() {
  try {
    await apiFetch('/logout', { method: 'POST' })
  } catch {
    // best-effort — the local token is cleared below regardless
  } finally {
    clearToken()
  }
}

export async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = { ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetchWithTimeout(`/api${path}`, {
    ...options,
    headers,
  })
  // A Bearer token can go stale without any client-side signal (expired, or revoked by a
  // logout elsewhere) — the local copy in sessionStorage has no way to know that on its own.
  if (response.status === 401 && token) {
    clearToken()
    window.dispatchEvent(new Event('admin:unauthorized'))
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${response.status}`)
  }
  if (response.status === 204) return null
  return response.json()
}
