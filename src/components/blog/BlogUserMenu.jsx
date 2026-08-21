import { useEffect, useRef, useState } from 'react'

function BlogUserMenu({ onOpenContactInfo, onLogout, onClose }) {
  const menuRef = useRef(null)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    function handleOutsideMouseDown(e) {
      if (!menuRef.current?.contains(e.target)) onClose()
    }
    window.addEventListener('mousedown', handleOutsideMouseDown)
    return () => window.removeEventListener('mousedown', handleOutsideMouseDown)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl bg-[#18191a] text-sm text-white shadow-2xl"
    >
      <button
        type="button"
        onClick={() => setAboutOpen((prev) => !prev)}
        className="block w-full cursor-pointer px-4 py-3 text-center font-semibold hover:bg-white/10"
      >
        ABOUT
      </button>
      {aboutOpen && (
        <p className="border-t border-white/10 px-4 py-3 text-xs text-white/60">
          Sonny's Blog — thoughts, projects, and updates from the desktop.
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          onOpenContactInfo?.()
          onClose()
        }}
        className="block w-full cursor-pointer border-t border-white/10 px-4 py-3 text-center font-semibold hover:bg-white/10"
      >
        Contact Developer
      </button>
      <button
        type="button"
        onClick={() => {
          onLogout?.()
          onClose()
        }}
        className="block w-full cursor-pointer border-t border-white/10 px-4 py-3 text-center font-semibold hover:bg-white/10"
      >
        Log out
      </button>
    </div>
  )
}

export default BlogUserMenu
