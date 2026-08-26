import { wallpapers } from '../../data/wallpapers.js'

const cyberWallpaper = wallpapers.find((w) => w.id === 'cyber')

function ContactSceneBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{ backgroundColor: cyberWallpaper.baseColor }}
    >
      {cyberWallpaper.layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: layer.opacity ?? 1,
            backgroundImage: layer.backgroundImage,
            backgroundSize: layer.backgroundSize,
          }}
        />
      ))}
    </div>
  )
}

export default ContactSceneBackdrop
