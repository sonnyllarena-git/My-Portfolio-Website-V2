const VERSION_KEY = 'blog:seedVersion'

function staleBlogKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key === 'blog:activity' || key?.startsWith('blog:interactions:')) {
      keys.push(key)
    }
  }
  return keys
}

export function ensureBlogSeedVersion(currentVersion) {
  if (localStorage.getItem(VERSION_KEY) === String(currentVersion)) return
  staleBlogKeys().forEach((key) => localStorage.removeItem(key))
  localStorage.setItem(VERSION_KEY, String(currentVersion))
}
