import StoreHeader from './store/StoreHeader.jsx'
import StoreNav from './store/StoreNav.jsx'
import StoreSidebar from './store/StoreSidebar.jsx'
import StoreProductGrid from './store/StoreProductGrid.jsx'
import StoreFooter from './store/StoreFooter.jsx'
import { useIsMobile } from '../hooks/useIsMobile.js'
import { STORE_PAGE_BG } from './store/theme.js'

function StoreApp() {
  const isMobile = useIsMobile()

  return (
    <div className={`flex h-full flex-col overflow-auto ${STORE_PAGE_BG}`}>
      <StoreHeader />
      <StoreNav />
      <div className={`flex shrink-0 gap-3 p-3 ${isMobile ? 'flex-col' : ''}`}>
        <StoreSidebar />
        <StoreProductGrid />
      </div>
      <StoreFooter />
    </div>
  )
}

export default StoreApp
