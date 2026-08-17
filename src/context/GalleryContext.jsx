import { createContext, useContext, useState } from 'react'
import { galleryArtworks } from '../data/galleryArtworks.js'

const GalleryContext = createContext(null)

export function GalleryProvider({ children }) {
  const [artworks, setArtworks] = useState(galleryArtworks)

  function addArtwork(artwork) {
    setArtworks((prev) => [artwork, ...prev])
  }

  function deleteArtwork(id) {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id))
  }

  return (
    <GalleryContext.Provider value={{ artworks, addArtwork, deleteArtwork }}>
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
