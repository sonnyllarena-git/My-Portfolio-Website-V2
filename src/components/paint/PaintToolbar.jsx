const MENU_ITEMS = ['File', 'Edit', 'Image', 'Colors', 'Help']

const TOOLS = [
  { id: 'brush', label: 'Brush', glyph: '✏️' },
  { id: 'eraser', label: 'Eraser', glyph: '🧹' },
  { id: 'line', label: 'Line', glyph: '╱' },
  { id: 'rectangle', label: 'Rectangle', glyph: '▭' },
  { id: 'circle', label: 'Circle', glyph: '◯' },
  { id: 'fill', label: 'Fill Bucket', glyph: '🪣' },
]

const PALETTE = [
  '#111827',
  '#ffffff',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#6b7280',
  '#92400e',
]

function ToolButton({ active, label, glyph, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded text-lg ${
        active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      {glyph}
    </button>
  )
}

function PaintToolbar({
  tool,
  onToolChange,
  color,
  onColorChange,
  size,
  onSizeChange,
  opacity,
  onOpacityChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onDownload,
  title,
  onTitleChange,
  onSave,
}) {
  return (
    <div className="border-b border-gray-200 bg-gray-100 text-gray-800">
      <div className="flex gap-4 border-b border-gray-200 px-3 py-1.5 text-sm">
        {MENU_ITEMS.map((item) => (
          <span key={item} className="cursor-pointer hover:text-black">
            {item}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2">
        <div className="flex gap-1">
          {TOOLS.map((t) => (
            <ToolButton
              key={t.id}
              active={tool === t.id}
              label={t.label}
              glyph={t.glyph}
              onClick={() => onToolChange(t.id)}
            />
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          Size
          <input
            type="range"
            min="1"
            max="50"
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
          />
          {size}
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          Opacity
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
          />
          {Math.round(opacity * 100)}%
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled"
          aria-label="Artwork title"
          className="ml-auto w-32 rounded border border-gray-300 px-2 py-1 text-xs"
        />
        <button
          onClick={onSave}
          className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          💾 Save
        </button>
      </div>
      <div className="flex items-center gap-1 px-3 py-2">
        {PALETTE.map((swatch) => (
          <button
            key={swatch}
            onClick={() => onColorChange(swatch)}
            aria-label={`Color ${swatch}`}
            style={{ backgroundColor: swatch }}
            className={`h-6 w-6 rounded border ${
              color === swatch
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-300'
            }`}
          />
        ))}
        <div className="ml-auto flex gap-1 text-gray-600">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            aria-label="Undo"
            className="rounded px-2 py-1 hover:bg-gray-200 disabled:opacity-30"
          >
            ↩
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            aria-label="Redo"
            className="rounded px-2 py-1 hover:bg-gray-200 disabled:opacity-30"
          >
            ↪
          </button>
          <button
            onClick={onClear}
            aria-label="Clear canvas"
            className="rounded px-2 py-1 hover:bg-gray-200"
          >
            🗑️
          </button>
          <button
            onClick={onDownload}
            aria-label="Download artwork"
            className="rounded px-2 py-1 hover:bg-gray-200"
          >
            ⬇️
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaintToolbar
