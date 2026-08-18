function PdfGlyph({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 2h10l6 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
        fill="#ffffff"
      />
      <path d="M14 2v6h6" fill="#cbd5e1" />
      <rect x="2" y="15" width="16" height="6" rx="1" fill="#e11d48" />
      <text
        x="10"
        y="19.5"
        textAnchor="middle"
        fontSize="5"
        fontWeight="700"
        fill="#ffffff"
      >
        PDF
      </text>
    </svg>
  )
}

export default PdfGlyph
