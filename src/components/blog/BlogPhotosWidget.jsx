const PHOTO_TILE_COLORS = [
  'bg-rose-200',
  'bg-amber-200',
  'bg-sky-200',
  'bg-emerald-200',
  'bg-violet-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-fuchsia-200',
  'bg-lime-200',
]

function BlogPhotosWidget() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Photos</h3>
      <div className="grid grid-cols-3 gap-1.5">
        {PHOTO_TILE_COLORS.map((color) => (
          <div key={color} className={`aspect-square rounded ${color}`} />
        ))}
      </div>
    </div>
  )
}

export default BlogPhotosWidget
