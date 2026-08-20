import { useIsMobile } from '../../../hooks/useIsMobile.js'

const ROWS = [
  {
    border: 'border-slate-300',
    keys: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '-',
      '=',
      { label: '⌫', wide: true },
    ],
  },
  {
    border: 'border-red-500',
    keys: [
      { label: 'Tab' },
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
    ],
  },
  {
    border: 'border-emerald-500',
    keys: [
      { label: 'Caps' },
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      "'",
      { label: 'Enter', wide: true },
    ],
  },
  {
    border: 'border-sky-500',
    keys: [
      { label: 'Shift', wide: true },
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '/',
      { label: 'Shift', wide: true },
    ],
  },
  {
    border: 'border-sky-500',
    keys: [
      { label: 'Ctrl' },
      { label: 'Alt' },
      { label: 'Space', key: ' ', extraWide: true },
      { label: 'Alt' },
      { label: 'Ctrl' },
    ],
  },
]

const STATUS_CLASSES = {
  correct: 'bg-green-400 text-green-950 border-green-300',
  incorrect: 'bg-red-500 text-white border-red-300',
}

export default function VirtualKeyboard({
  activeKey = null,
  activeStatus = null,
}) {
  const isMobile = useIsMobile()
  if (isMobile) return null

  return (
    <div className="relative rounded-2xl border-4 border-rose-800 bg-gradient-to-b from-slate-700 to-slate-800 p-4 shadow-xl">
      <div className="mb-2 flex justify-between px-1">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={`l-${i}`}
              className="h-2.5 w-2.5 rounded-full bg-red-500"
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={`r-${i}`}
              className="h-2.5 w-2.5 rounded-full bg-red-500"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5">
            {row.keys.map((key, keyIndex) => {
              const isString = typeof key === 'string'
              const label = isString ? key.toUpperCase() : key.label
              const dataKey = isString ? key : (key.key ?? null)
              const isActive =
                dataKey !== null &&
                activeKey !== null &&
                activeStatus !== null &&
                dataKey === activeKey
              const widthClass = key.extraWide
                ? 'w-40'
                : key.wide
                  ? 'w-16'
                  : 'w-9'
              return (
                <div
                  key={keyIndex}
                  data-key={dataKey ?? undefined}
                  className={`flex h-9 ${widthClass} items-center justify-center rounded-md border-2 text-xs font-bold text-slate-100 shadow-inner transition-colors duration-150 ${
                    isActive
                      ? STATUS_CLASSES[activeStatus]
                      : `bg-slate-500/70 ${row.border}`
                  }`}
                >
                  {label}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
