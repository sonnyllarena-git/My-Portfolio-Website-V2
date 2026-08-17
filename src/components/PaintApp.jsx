import { useRef, useState } from 'react'
import PaintToolbar from './paint/PaintToolbar.jsx'
import PaintCanvas from './paint/PaintCanvas.jsx'
import { useGallery } from '../context/GalleryContext.jsx'

function PaintApp({ onOpenGallery }) {
  const { addArtwork } = useGallery()
  const canvasRef = useRef(null)
  const [tool, setTool] = useState('brush')
  const [color, setColor] = useState('#111827')
  const [size, setSize] = useState(5)
  const [opacity, setOpacity] = useState(1)
  const [history, setHistory] = useState({ canUndo: false, canRedo: false })
  const [title, setTitle] = useState('')
  const [showSavedToast, setShowSavedToast] = useState(false)

  function handleDownload() {
    const link = document.createElement('a')
    link.href = canvasRef.current.getDataUrl()
    link.download = 'artwork.png'
    link.click()
  }

  function handleSave() {
    addArtwork({
      id: `art-${Date.now()}`,
      title: title.trim() || 'Untitled',
      author: 'Guest',
      timestamp: new Date().toISOString(),
      imageData: canvasRef.current.getDataUrl(),
    })
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 text-gray-900">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
        <span>
          🖼️ Draw a visual memory for Pouya Shahri&apos;s shared portfolio
          gallery.
        </span>
        <button
          onClick={onOpenGallery}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium hover:bg-gray-50"
        >
          Open Visual Arts
        </button>
      </div>
      <PaintToolbar
        tool={tool}
        onToolChange={setTool}
        color={color}
        onColorChange={setColor}
        size={size}
        onSizeChange={setSize}
        opacity={opacity}
        onOpacityChange={setOpacity}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={() => canvasRef.current.undo()}
        onRedo={() => canvasRef.current.redo()}
        onClear={() => canvasRef.current.clear()}
        onDownload={handleDownload}
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
      />
      <div className="relative flex-1 overflow-hidden bg-gray-200 p-4">
        <PaintCanvas
          ref={canvasRef}
          tool={tool}
          color={color}
          size={size}
          opacity={opacity}
          onHistoryChange={setHistory}
        />
        {showSavedToast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/80 px-3 py-1.5 text-xs text-white shadow-lg">
            Saved to Visitor Arts!
          </div>
        )}
      </div>
    </div>
  )
}

export default PaintApp
