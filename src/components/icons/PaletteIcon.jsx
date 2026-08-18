function PaletteIcon({ className = 'h-5 w-5' }) {
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
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 1.9-1 1.4-2.1-.4-.9-.9-1.4.1-2.4 1-1 2.4-.4 3.9-.9s2.6-2.5 2.6-4.6A8 8 0 0 0 12 3z" />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default PaletteIcon
