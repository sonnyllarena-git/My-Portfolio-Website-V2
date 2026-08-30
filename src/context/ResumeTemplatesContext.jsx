import { createContext, useContext, useEffect, useState } from 'react'

const ResumeTemplatesContext = createContext(null)

export function ResumeTemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/resume-templates?published=true')
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then((rows) => setTemplates(rows))
      .catch(() => setError('Could not load resume templates right now.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ResumeTemplatesContext.Provider value={{ templates, loading, error }}>
      {children}
    </ResumeTemplatesContext.Provider>
  )
}

export function useResumeTemplates() {
  const context = useContext(ResumeTemplatesContext)
  if (!context) {
    throw new Error(
      'useResumeTemplates must be used within a ResumeTemplatesProvider',
    )
  }
  return context
}
