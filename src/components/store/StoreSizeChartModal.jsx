const SIZE_CHART_ROWS = [
  {
    size: 'S',
    chest: 43.7,
    sleeveLength: 25.2,
    shoulder: 18.4,
    centerBack: 27,
  },
  {
    size: 'M',
    chest: 45.7,
    sleeveLength: 25.6,
    shoulder: 18.9,
    centerBack: 27.6,
  },
  {
    size: 'L',
    chest: 48.7,
    sleeveLength: 26,
    shoulder: 19.6,
    centerBack: 28.1,
  },
  {
    size: 'XL',
    chest: 51.7,
    sleeveLength: 26.4,
    shoulder: 20.3,
    centerBack: 28.7,
  },
  {
    size: '2XL',
    chest: 54.6,
    sleeveLength: 26.8,
    shoulder: 21,
    centerBack: 29.3,
  },
  {
    size: '3XL',
    chest: 57.6,
    sleeveLength: 26.8,
    shoulder: 21.7,
    centerBack: 29.3,
  },
  {
    size: '4XL',
    chest: 60.6,
    sleeveLength: 26.8,
    shoulder: 22.4,
    centerBack: 29.3,
  },
]

function StoreSizeChartModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-black">Size Chart</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-lg text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto p-4 text-sm text-black">
          <h4 className="mb-2 font-semibold">US Mens Hoodies</h4>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500">
                <th className="py-1.5 pr-2">Brand Size</th>
                <th className="py-1.5 pr-2">Chest (in)</th>
                <th className="py-1.5 pr-2">Sleeve Length (in)</th>
                <th className="py-1.5 pr-2">Shoulder (in)</th>
                <th className="py-1.5">Center back length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SIZE_CHART_ROWS.map((row) => (
                <tr key={row.size}>
                  <td className="py-1.5 pr-2 font-semibold">{row.size}</td>
                  <td className="py-1.5 pr-2">{row.chest}</td>
                  <td className="py-1.5 pr-2">{row.sleeveLength}</td>
                  <td className="py-1.5 pr-2">{row.shoulder}</td>
                  <td className="py-1.5">{row.centerBack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StoreSizeChartModal
