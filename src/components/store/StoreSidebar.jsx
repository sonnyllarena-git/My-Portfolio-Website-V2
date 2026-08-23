import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { STORE_LINK_BLUE, STORE_STAR_COLOR, STORE_BODY_TEXT } from './theme.js'

const POPULAR_IDEAS = ['Pullover', 'Fleece', 'Gray', 'Brown']
const GENDERS = ['Men', 'Women', 'Boys', 'Girls', 'Babies', 'Unisex']
const COLORS = [
  '#000000',
  '#808080',
  '#2563eb',
  '#ffffff',
  '#78350f',
  '#d2b48c',
  '#dc2626',
  '#ec4899',
  '#f97316',
  '#facc15',
  '#fefce8',
  '#16a34a',
  '#7c3aed',
  '#a3a3a3',
  '#bae6fd',
]

function StoreSidebar() {
  const isMobile = useIsMobile()
  const [freeShipping, setFreeShipping] = useState(false)
  const [selectedGenders, setSelectedGenders] = useState(new Set())
  const [selectedColor, setSelectedColor] = useState(null)

  function toggleGender(gender) {
    setSelectedGenders((prev) => {
      const next = new Set(prev)
      next.has(gender) ? next.delete(gender) : next.add(gender)
      return next
    })
  }

  const filters = (
    <>
      <div>
        <h3 className="mb-2 font-semibold">Popular Shopping Ideas</h3>
        <ul className="space-y-1">
          {POPULAR_IDEAS.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
        <button className={`mt-1 ${STORE_LINK_BLUE}`}>▾ See more</button>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Free Shipping by Amazon</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={() => setFreeShipping((prev) => !prev)}
          />
          Eligible for Free Shipping
        </label>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Gender</h3>
        <div className="space-y-1">
          {GENDERS.map((gender) => (
            <label key={gender} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedGenders.has(gender)}
                onChange={() => toggleGender(gender)}
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Color</h3>
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              aria-label={color}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`h-6 w-6 rounded-full border ${
                selectedColor === color
                  ? 'ring-2 ring-offset-1 ring-blue-500'
                  : 'border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Customer Reviews</h3>
        <button className={`flex items-center gap-1 ${STORE_STAR_COLOR}`}>
          ★★★★☆ <span className="text-black">& Up</span>
        </button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <details className={`bg-white p-4 text-sm ${STORE_BODY_TEXT}`}>
        <summary className="cursor-pointer font-semibold">Filters</summary>
        <div className="mt-3 flex flex-col gap-4">{filters}</div>
      </details>
    )
  }

  return (
    <div
      className={`flex w-72 shrink-0 flex-col gap-4 bg-white p-4 text-sm ${STORE_BODY_TEXT}`}
    >
      {filters}
    </div>
  )
}

export default StoreSidebar
