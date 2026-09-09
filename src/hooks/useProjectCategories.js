import { useEffect, useState } from 'react'

export function useProjectCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/project-categories')
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then((rows) => setCategories(rows.map((row) => row.name)))
      .catch((err) => {
        console.error('Failed to load project categories:', err)
        setCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}
