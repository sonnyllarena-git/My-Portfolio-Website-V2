import { useState } from 'react'
import { useGallery } from '../context/GalleryContext.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'

function downloadArtwork(artwork) {
  const link = document.createElement('a')
  link.href = artwork.imageData
  link.download = artwork.title
  link.click()
}

function ArtCard({ artwork, onView, onDelete, isMobile = false }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#15171c]">
      <button
        onClick={() => onView(artwork)}
        aria-label={`View ${artwork.title}`}
        className="block w-full"
      >
        <img
          src={artwork.imageData}
          alt={artwork.title}
          className="aspect-square w-full object-cover"
        />
      </button>
      <div
        className={`absolute top-1 right-1 gap-1 ${isMobile ? 'flex' : 'hidden group-hover:flex'}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            downloadArtwork(artwork)
          }}
          aria-label={`Download ${artwork.title}`}
          className="rounded bg-black/60 px-1.5 py-1 text-xs hover:bg-black/80"
        >
          ⬇️
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(artwork)
          }}
          aria-label={`Delete ${artwork.title}`}
          className="rounded bg-black/60 px-1.5 py-1 text-xs hover:bg-red-600"
        >
          🗑️
        </button>
      </div>
      <div className="px-3 py-2">
        <div className="truncate text-xs font-medium">{artwork.title}</div>
        <div className="text-xs text-white/40">Saved</div>
      </div>
    </div>
  )
}

function VisitorArtsApp({ onOpenPaint }) {
  const { artworks, deleteArtwork } = useGallery()
  const isMobile = useIsMobile()
  const [search, setSearch] = useState('')
  const [previewArtwork, setPreviewArtwork] = useState(null)
  const filtered = artworks.filter((artwork) =>
    artwork.title.toLowerCase().includes(search.toLowerCase()),
  )

  function handleDelete(artwork) {
    deleteArtwork(artwork.id)
    setPreviewArtwork((current) =>
      current?.id === artwork.id ? null : current,
    )
  }

  return (
    <div
      className={`flex h-full text-sm text-white ${isMobile ? 'flex-col' : ''}`}
    >
      <aside
        className={`flex shrink-0 flex-col gap-4 bg-[#12141a] p-4 ${
          isMobile
            ? 'w-full border-b border-white/10'
            : 'w-60 border-r border-white/10'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-lg">
            🎨
          </div>
          <div>
            <div className="font-semibold">Visual Arts</div>
            <div className="text-xs text-white/50">
              Shared portfolio gallery
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-white/70">
          Visitor drawings become part of Pouya Shahri&apos;s interactive
          portfolio. Open Paint, create a small visual memory, save it, and
          future visitors can browse it here.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="text-2xl font-bold">{artworks.length}</div>
          <div className="text-xs text-white/50">saved artworks</div>
        </div>
        <button
          onClick={onOpenPaint}
          className="rounded bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700"
        >
          Open Paint
        </button>
      </aside>
      <div className="flex flex-1 flex-col bg-[#0d0e11]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-white/80">
          <button aria-label="Back" className="rounded px-1 hover:bg-white/10">
            ←
          </button>
          <button
            aria-label="Forward"
            className="rounded px-1 hover:bg-white/10"
          >
            →
          </button>
          <button aria-label="Up" className="rounded px-1 hover:bg-white/10">
            ↑
          </button>
          <div className="flex-1 rounded-full bg-white/5 px-3 py-1 text-xs">
            D:/Visitor Arts
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-40 rounded-full bg-white/5 px-3 py-1 text-xs placeholder-white/40 focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div
            className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}
          >
            {filtered.map((artwork) => (
              <ArtCard
                key={artwork.id}
                artwork={artwork}
                onView={setPreviewArtwork}
                onDelete={handleDelete}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-3 py-1.5 text-xs text-white/60">
          {filtered.length} items
        </div>
      </div>
      {previewArtwork && (
        <div
          onClick={() => setPreviewArtwork(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/80 p-8"
        >
          <img
            src={previewArtwork.imageData}
            alt={previewArtwork.title}
            className="max-h-[70vh] max-w-[80vw] rounded-lg object-contain shadow-2xl"
          />
          <div className="flex items-center gap-3 text-sm text-white">
            <span>{previewArtwork.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                downloadArtwork(previewArtwork)
              }}
              className="rounded bg-white/10 px-3 py-1 hover:bg-white/20"
            >
              Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPreviewArtwork(null)
              }}
              className="rounded bg-white/10 px-3 py-1 hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitorArtsApp
