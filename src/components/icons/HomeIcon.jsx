function HomeIcon({ className = 'h-5 w-5' }) {
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
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  )
}

export default HomeIcon
