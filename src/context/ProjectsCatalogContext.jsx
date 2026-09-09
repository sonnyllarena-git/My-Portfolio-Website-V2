import { createContext, useContext, useEffect, useState } from 'react'
import { mapCatalogProjectToProject } from '../utils/mapCatalogProject.js'

const ProjectsCatalogContext = createContext(null)

export function ProjectsCatalogProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/projects?published=true')
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then((rows) => setProjects(rows.map(mapCatalogProjectToProject)))
      .catch((err) => {
        console.error('Failed to load projects:', err)
        setError('Could not load projects right now.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <ProjectsCatalogContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsCatalogContext.Provider>
  )
}

export function useProjectsCatalog() {
  const context = useContext(ProjectsCatalogContext)
  if (!context) {
    throw new Error(
      'useProjectsCatalog must be used within a ProjectsCatalogProvider',
    )
  }
  return context
}
