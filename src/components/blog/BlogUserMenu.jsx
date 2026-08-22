import { useEffect, useRef, useState } from 'react'

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function AboutIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="6" cy="19" r="2.6" />
      <circle cx="6" cy="17.9" r="0.15" fill="currentColor" />
      <line x1="6" y1="18.9" x2="6" y2="20.2" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function MinimizeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  )
}

function MaximizeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="7" width="13" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <polyline points="15 16 20 12 15 8" />
      <line x1="20" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-slate-400"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function MenuRow({ icon, label, chevron, onClick, extra }) {
  return (
    <div className="border-t border-slate-200 first:border-t-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-slate-100"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-700">
          {icon}
        </span>
        <span className="flex-1 font-semibold text-slate-900">{label}</span>
        {chevron && <ChevronIcon />}
      </button>
      {extra}
    </div>
  )
}

function BlogUserMenu({
  onOpenContactInfo,
  onMinimize,
  onMaximize,
  onLogout,
  onClose,
}) {
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
      className="absolute top-full right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl bg-white text-sm text-slate-900 shadow-2xl"
    >
      <MenuRow
        icon={<AboutIcon />}
        label="ABOUT"
        chevron
        onClick={() => setAboutOpen((prev) => !prev)}
        extra={
          aboutOpen && (
            <p className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
              Sonny's Blog — thoughts, projects, and updates from the desktop.
            </p>
          )
        }
      />
      <MenuRow
        icon={<ContactIcon />}
        label="Contact Developer"
        chevron
        onClick={() => {
          onOpenContactInfo?.()
          onClose()
        }}
      />
      <MenuRow
        icon={<MinimizeIcon />}
        label="Minimize"
        onClick={() => {
          onMinimize?.()
          onClose()
        }}
      />
      <MenuRow
        icon={<MaximizeIcon />}
        label="Maximize"
        onClick={() => {
          onMaximize?.()
          onClose()
        }}
      />
      <MenuRow
        icon={<LogoutIcon />}
        label="Log out"
        onClick={() => {
          onLogout?.()
          onClose()
        }}
      />
    </div>
  )
}

export default BlogUserMenu
