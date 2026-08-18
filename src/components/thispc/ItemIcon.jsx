import { iconImages } from '../../assets/icons/index.js'

function ItemIcon({ id, icon, imgClassName, textClassName }) {
  return iconImages[id] ? (
    <img
      src={iconImages[id]}
      alt=""
      className={`${imgClassName} object-contain`}
    />
  ) : (
    <span className={textClassName}>{icon}</span>
  )
}

export default ItemIcon
