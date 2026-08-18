import { iconImages } from '../../assets/icons/index.js'
import PdfGlyph from '../icons/PdfGlyph.jsx'

function ItemIcon({ id, icon, imgClassName, textClassName }) {
  if (iconImages[id]) {
    return (
      <img
        src={iconImages[id]}
        alt=""
        className={`${imgClassName} object-contain`}
      />
    )
  }
  if (icon === 'pdf') {
    return <PdfGlyph className={imgClassName} />
  }
  return (
    <span
      className={`flex items-center justify-center ${imgClassName} ${textClassName ?? ''}`}
    >
      {icon}
    </span>
  )
}

export default ItemIcon
