import { useState } from 'react'
import StoreHeader from './store/StoreHeader.jsx'
import StoreNav from './store/StoreNav.jsx'
import StoreSidebar from './store/StoreSidebar.jsx'
import StoreProductGrid from './store/StoreProductGrid.jsx'
import StoreFooter from './store/StoreFooter.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { STORE_PAGE_BG } from './store/theme.js'
import { storeProducts } from './store/data/storeProducts.js'
import { filterStoreProducts } from './store/filterStoreProducts.js'

function StoreApp() {
  const isMobile = useIsMobile()
  const [selectedGenders, setSelectedGenders] = useState(new Set())
  const [selectedColor, setSelectedColor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  function toggleGender(gender) {
    setSelectedGenders((prev) => {
      const next = new Set(prev)
      next.has(gender) ? next.delete(gender) : next.add(gender)
      return next
    })
  }

  const filteredProducts = filterStoreProducts(storeProducts, {
    genders: selectedGenders,
    color: selectedColor,
    query: searchQuery,
  })

  return (
    <div className={`flex h-full flex-col overflow-auto ${STORE_PAGE_BG}`}>
      <StoreHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <StoreNav />
      <div className={`flex shrink-0 gap-3 p-3 ${isMobile ? 'flex-col' : ''}`}>
        <StoreSidebar
          selectedGenders={selectedGenders}
          onToggleGender={toggleGender}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
        <StoreProductGrid products={filteredProducts} />
      </div>
      <StoreFooter />
    </div>
  )
}

export default StoreApp
