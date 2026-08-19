const TILE_COLORS = {
  0: 'bg-white/5 text-transparent',
  2: 'bg-[#eee4da] text-[#776e65]',
  4: 'bg-[#ede0c8] text-[#776e65]',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white',
}

function tileClass(value) {
  return TILE_COLORS[value] ?? 'bg-[#3c3a32] text-white'
}

export default function Grid2048({ grid }) {
  return (
    <div className="grid grid-cols-4 gap-3 rounded-xl bg-[#bbada0] p-3">
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`flex aspect-square items-center justify-center rounded-lg text-2xl font-bold ${tileClass(value)}`}
          >
            {value !== 0 ? value : ''}
          </div>
        )),
      )}
    </div>
  )
}
