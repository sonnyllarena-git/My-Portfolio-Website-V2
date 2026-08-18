function LibraryIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="4" y2="20" />
      <line x1="9" y1="4" x2="9" y2="20" />
      <line x1="14" y1="4" x2="14" y2="20" />
      <line x1="20" y1="6" x2="21.5" y2="19" />
    </svg>
  )
}

export default LibraryIcon
