const BRAND_COLORS = {
  email: '#4b5563',
  whatsapp: '#25d366',
  viber: '#7360f2',
  facebook: '#1877f2',
  linkedin: '#0077b5',
  tiktok: '#000000',
  youtube: '#ff0000',
}

function EnvelopeGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
      <path d="M9.5 7.5v9l7-4.5z" />
    </svg>
  )
}

function NoteGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="8.5" cy="17.5" r="2.5" />
      <path d="M11 17.5V5l7 1.7v3.2" />
    </svg>
  )
}

function TextGlyph({ text }) {
  return <span className="text-sm font-bold text-white">{text}</span>
}

const GLYPHS = {
  email: EnvelopeGlyph,
  whatsapp: PhoneGlyph,
  viber: PhoneGlyph,
  youtube: PlayGlyph,
  tiktok: NoteGlyph,
}

const TEXT_GLYPHS = {
  facebook: 'f',
  linkedin: 'in',
}

function SocialIcon({ kind }) {
  const backgroundColor = BRAND_COLORS[kind] ?? '#4b5563'
  const Glyph = GLYPHS[kind]

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor }}
    >
      {Glyph ? <Glyph /> : <TextGlyph text={TEXT_GLYPHS[kind] ?? '?'} />}
    </span>
  )
}

export default SocialIcon
