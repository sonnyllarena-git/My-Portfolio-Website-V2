import { lazy, Suspense, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { contactInfo } from '../data/contactInfo.js'
import { CONTACT_ICON_LAYOUT } from '../data/contactSceneLayout.js'
import { buildContactIcons } from '../utils/buildContactIcons.js'
import { useIsMobile } from '../hooks/useIsMobile.js'
import ContactMobileGrid from './contactScene/ContactMobileGrid.jsx'
import ContactProfileModal from './contactScene/ContactProfileModal.jsx'
import ContactModalLayer from './contactScene/ContactModalLayer.jsx'

const ContactSceneCanvas = lazy(
  () => import('./contactScene/ContactSceneCanvas.jsx'),
)

function useContactIcons() {
  return useMemo(() => {
    const content = buildContactIcons(contactInfo)
    return CONTACT_ICON_LAYOUT.map((layout) => ({
      ...layout,
      ...content.find((entry) => entry.id === layout.id),
    }))
  }, [])
}

function ContactInfoApp({ isMinimized = false }) {
  const isMobile = useIsMobile()
  const icons = useContactIcons()
  const [activeId, setActiveId] = useState(null)
  const [anchor, setAnchor] = useState(null)
  const activeIcon = icons.find((icon) => icon.id === activeId) ?? null

  function handleActivate(id, clickAnchor = null) {
    setActiveId(id)
    setAnchor(clickAnchor)
  }

  function handleClose() {
    setActiveId(null)
    setAnchor(null)
  }

  return (
    <div className="h-full w-full">
      {isMobile ? (
        <ContactMobileGrid icons={icons} onSelectIcon={handleActivate} />
      ) : (
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-sm text-white/40">
              Loading scene…
            </div>
          }
        >
          <ContactSceneCanvas
            icons={icons}
            activeId={activeId}
            onActivate={handleActivate}
            isMinimized={isMinimized}
          />
        </Suspense>
      )}
      {isMobile ? (
        activeIcon && (
          <ContactProfileModal icon={activeIcon} onClose={handleClose} />
        )
      ) : (
        <AnimatePresence>
          {activeIcon && (
            <ContactModalLayer
              icon={activeIcon}
              anchor={anchor}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default ContactInfoApp
