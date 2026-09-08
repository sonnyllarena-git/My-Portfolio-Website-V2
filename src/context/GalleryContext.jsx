import { createContext, useContext, useState } from 'react'
import { fetchArtworks, submitArtwork } from '../utils/visitorArtsApi.js'

const GalleryContext = createContext(null)

export function GalleryProvider({ children }) {
  const [artworks, setArtworks] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  async function loadArtworks() {
    if (loaded) return
    setLoading(true)
    try {
      const rows = await fetchArtworks()
      setArtworks(rows)
      setLoaded(true)
    } finally {
      setLoading(false)
    }
  }

  async function addArtwork({ title, author, imageData }) {
    const saved = await submitArtwork({ title, author, imageData })
    setArtworks((prev) => [saved, ...prev])
    return saved
  }

  return (
    <GalleryContext.Provider
      value={{ artworks, loading, loadArtworks, addArtwork }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export function useGallery() {
  const context = useContext(GalleryContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}
