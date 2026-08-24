import { useState } from 'react'
import StoreHeader from './store/StoreHeader.jsx'
import StoreNav from './store/StoreNav.jsx'
import StoreSidebar from './store/StoreSidebar.jsx'
import StoreProductGrid from './store/StoreProductGrid.jsx'
import StoreProductDetails from './store/StoreProductDetails.jsx'
import StoreCartPage from './store/StoreCartPage.jsx'
import StoreCheckoutPage from './store/StoreCheckoutPage.jsx'
import StoreSignInPage from './store/StoreSignInPage.jsx'
import StoreSignUpPage from './store/StoreSignUpPage.jsx'
import StoreFooter from './store/StoreFooter.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { StoreCartProvider } from '../context/StoreCartContext.jsx'
import {
  StoreCatalogProvider,
  useStoreCatalog,
} from '../context/StoreCatalogContext.jsx'
import { STORE_PAGE_BG } from './store/theme.js'
import { filterStoreProducts } from './store/filterStoreProducts.js'

function StoreAppContent() {
  const isMobile = useIsMobile()
  const { products: storeProducts, error } = useStoreCatalog()
  const [selectedGenders, setSelectedGenders] = useState(new Set())
  const [selectedColor, setSelectedColor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [userName, setUserName] = useState(null)
  const [view, setView] = useState('grid') // 'grid' | 'details' | 'cart' | 'checkout' | 'signin' | 'signup'

  function completeSignIn(name) {
    setUserName(name)
    setView('grid')
  }

  function toggleGender(gender) {
    setSelectedGenders((prev) => {
      const next = new Set(prev)
      next.has(gender) ? next.delete(gender) : next.add(gender)
      return next
    })
  }

  function openProduct(productId) {
    setSelectedProductId(productId)
    setView('details')
  }

  const filteredProducts = filterStoreProducts(storeProducts, {
    genders: selectedGenders,
    color: selectedColor,
    query: searchQuery,
  })

  const selectedProduct = storeProducts.find(
    (product) => product.id === selectedProductId,
  )

  return (
    <StoreCartProvider>
      <div className={`flex h-full flex-col overflow-auto ${STORE_PAGE_BG}`}>
        <StoreHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCartClick={() => setView('cart')}
          userName={userName}
          onSignInClick={() => setView('signin')}
          onSignUpClick={() => setView('signup')}
          onSignOutClick={() => setUserName(null)}
        />
        <StoreNav />
        {view === 'signin' && (
          <StoreSignInPage
            onSignIn={completeSignIn}
            onSignUp={() => setView('signup')}
          />
        )}
        {view === 'signup' && (
          <StoreSignUpPage
            onSignUp={completeSignIn}
            onSignIn={() => setView('signin')}
          />
        )}
        {view === 'cart' && (
          <StoreCartPage
            onBack={() => setView('grid')}
            onSelectProduct={openProduct}
            onCheckout={() => setView('checkout')}
          />
        )}
        {view === 'checkout' && (
          <StoreCheckoutPage onExitToCart={() => setView('cart')} />
        )}
        {view === 'details' && selectedProduct && (
          <StoreProductDetails
            product={selectedProduct}
            onBack={() => setView('grid')}
          />
        )}
        {view === 'grid' && (
          <div
            className={`flex shrink-0 gap-3 p-3 ${isMobile ? 'flex-col' : ''}`}
          >
            <StoreSidebar
              selectedGenders={selectedGenders}
              onToggleGender={toggleGender}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
            <div className="flex flex-1 flex-col gap-3">
              {error && (
                <p className="rounded bg-red-50 p-2 text-center text-sm text-red-600">
                  {error}
                </p>
              )}
              <StoreProductGrid
                products={filteredProducts}
                onSelect={openProduct}
              />
            </div>
          </div>
        )}
        <StoreFooter />
      </div>
    </StoreCartProvider>
  )
}

function StoreApp() {
  return (
    <StoreCatalogProvider>
      <StoreAppContent />
    </StoreCatalogProvider>
  )
}

export default StoreApp
