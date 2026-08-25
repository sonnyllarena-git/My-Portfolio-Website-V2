function SpeakerIcon({ className = 'h-5 w-5', muted = false }) {
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
      <path d="M4 9v6h3l5 4V5L7 9H4z" />
      {muted ? (
        <path d="M16 9l4 6M20 9l-4 6" />
      ) : (
        <>
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M18.5 7a7 7 0 0 1 0 10" />
        </>
      )}
    </svg>
  )
}

export default SpeakerIcon
