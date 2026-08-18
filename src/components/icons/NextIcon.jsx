function NextIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 5h2v14h-2z" />
      <path d="M4 5v14l11-7z" />
    </svg>
  )
}

export default NextIcon
