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

export async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = { ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`/api${path}`, { ...options, headers })
  // A Bearer token can go stale without any client-side signal — the backend keeps valid
  // tokens in memory only, so restarting it (a routine part of local dev) silently logs
  // everyone out server-side while the token still looks valid in sessionStorage.
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
