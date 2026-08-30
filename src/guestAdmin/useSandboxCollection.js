import { useEffect, useState } from 'react'

function nextDemoCode(prefix, existingItems) {
  let max = 0
  for (const item of existingItems) {
    const match =
      typeof item.code === 'string' && item.code.match(/-DEMO-(\d+)$/)
    if (match) max = Math.max(max, Number(match[1]))
  }
  return `${prefix}-DEMO-${String(max + 1).padStart(4, '0')}`
}

export function useSandboxCollection(seedUrl, codePrefix) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(seedUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then((rows) => setItems(rows))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [seedUrl])

  function add(item) {
    let saved
    setItems((prev) => {
      const code = nextDemoCode(codePrefix, prev)
      saved = { ...item, code, published: item.published ?? false }
      return [...prev, saved]
    })
    return saved
  }

  function update(code, item) {
    const saved = { ...item, code }
    setItems((prev) =>
      prev.map((existing) => (existing.code === code ? saved : existing)),
    )
    return saved
  }

  function remove(code) {
    setItems((prev) => prev.filter((existing) => existing.code !== code))
  }

  function publish(code) {
    let published
    setItems((prev) =>
      prev.map((existing) => {
        if (existing.code !== code) return existing
        published = { ...existing, published: true }
        return published
      }),
    )
    return published
  }

  return { items, loading, add, update, remove, publish }
}
