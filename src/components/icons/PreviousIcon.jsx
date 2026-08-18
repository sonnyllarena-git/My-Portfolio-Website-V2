function PreviousIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 5h2v14H6z" />
      <path d="M20 5v14l-11-7z" />
    </svg>
  )
}

export default PreviousIcon
