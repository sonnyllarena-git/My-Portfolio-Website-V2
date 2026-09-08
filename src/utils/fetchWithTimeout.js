// Generous enough for a slow connection posting a Visitor Arts base64 canvas export
// (up to ~4MB of JSON, not FormData, so it doesn't qualify for the upload budget below).
const DEFAULT_TIMEOUT_MS = 20000
// Music Lab uploads allow media files up to 200MB — a slow connection legitimately needs
// much longer than the default timeout, so FormData bodies (file uploads) get their own budget.
const UPLOAD_TIMEOUT_MS = 5 * 60 * 1000

export async function fetchWithTimeout(url, options = {}, timeoutMs) {
  const resolvedTimeout =
    timeoutMs ??
    (options.body instanceof FormData ? UPLOAD_TIMEOUT_MS : DEFAULT_TIMEOUT_MS)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), resolvedTimeout)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out', { cause: err })
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}
