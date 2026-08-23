import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile.js'
import { STORE_LINK_BLUE, STORE_STAR_COLOR, STORE_BODY_TEXT } from './theme.js'

const POPULAR_IDEAS = ['Pullover', 'Fleece', 'Gray', 'Brown']
const GENDERS = ['Men', 'Women', 'Boys', 'Girls', 'Babies', 'Unisex']
const COLORS = [
  { hex: '#000000', name: 'Black' },
  { hex: '#808080', name: 'Heather Grey' },
  { hex: '#2563eb', name: 'Blue' },
  { hex: '#ffffff', name: 'White' },
  { hex: '#78350f', name: 'Brown' },
  { hex: '#d2b48c', name: 'Tan' },
  { hex: '#dc2626', name: 'Red' },
  { hex: '#ec4899', name: 'Pink' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#facc15', name: 'Yellow' },
  { hex: '#fefce8', name: 'Ivory' },
  { hex: '#16a34a', name: 'Green' },
  { hex: '#7c3aed', name: 'Purple' },
  { hex: '#a3a3a3', name: 'Silver' },
  { hex: '#bae6fd', name: 'Sky Blue' },
]

function StoreSidebar({
  selectedGenders = new Set(),
  onToggleGender = () => {},
  selectedColor = null,
  onSelectColor = () => {},
}) {
  const isMobile = useIsMobile()
  const [freeShipping, setFreeShipping] = useState(false)

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
                onChange={() => onToggleGender(gender)}
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
              key={color.name}
              aria-label={color.name}
              onClick={() => onSelectColor(color.name)}
              style={{ backgroundColor: color.hex }}
              className={`h-6 w-6 rounded-full border ${
                selectedColor === color.name
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
