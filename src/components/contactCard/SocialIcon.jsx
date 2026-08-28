import whatsappIcon from './assets/whatsapp.png'
import viberIcon from './assets/viber.png'
import facebookIcon from './assets/facebook.png'
import instagramIcon from './assets/insta.png'
import linkedinIcon from './assets/linkedin.png'
import tiktokIcon from './assets/tiktok.png'
import youtubeIcon from './assets/youtube.png'

const ICON_IMAGES = {
  whatsapp: whatsappIcon,
  viber: viberIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  linkedin: linkedinIcon,
  tiktok: tiktokIcon,
  youtube: youtubeIcon,
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

function SocialIcon({ kind }) {
  const iconSrc = ICON_IMAGES[kind]

  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt=""
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />
    )
  }

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-600">
      <EnvelopeGlyph />
    </span>
  )
}

export default SocialIcon
