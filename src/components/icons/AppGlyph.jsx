import { iconImages } from '../../assets/icons/index.js'
import PdfGlyph from './PdfGlyph.jsx'

function AppGlyph({
  id,
  icon,
  className = 'h-8 w-8',
  textClassName = 'text-2xl',
}) {
  if (iconImages[id]) {
    return (
      <img
        src={iconImages[id]}
        alt=""
        className={`${className} object-contain`}
      />
    )
  }
  if (icon === 'pdf') {
    return <PdfGlyph className={className} />
  }
  return (
    <span
      className={`flex items-center justify-center ${className} ${textClassName}`}
    >
      {icon}
    </span>
  )
}

export default AppGlyph
