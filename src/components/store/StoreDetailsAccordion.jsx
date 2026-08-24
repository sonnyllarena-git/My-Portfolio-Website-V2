import { useState } from 'react'
import { STORE_BODY_TEXT } from './theme.js'

function StoreDetailsAccordion({ title, rows, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border-t border-gray-200 py-2 ${STORE_BODY_TEXT}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
          className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded transition-transform duration-150 hover:bg-gray-100 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▾
        </button>
      </div>

      {isOpen && (
        <div className="mt-2">
          <div className="divide-y divide-gray-200">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[140px_1fr] gap-x-4 py-1.5 text-sm"
              >
                <span className="font-semibold">{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

export default StoreDetailsAccordion
