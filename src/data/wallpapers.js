import spidermanBack from '../assets/wallpaper/marvels-spider-man--11990.jpeg'
import ironSpider from '../assets/wallpaper/309451-3840x2160-desktop-4k-spider-man-background-image.jpg'
import spidermanStealth from '../assets/wallpaper/marvels-spider-man-3840x2160-13286.jpeg'
import windows11 from '../assets/wallpaper/windows_11___wallpaper_4k_by_karara160_dgj39c7-fullview.jpg'

function photoWallpaper(id, label, image) {
  return {
    id,
    label,
    swatch: `url(${image})`,
    baseColor: '#000000',
    layers: [
      {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    ],
  }
}

export const wallpapers = [
  {
    id: 'cyber',
    label: 'Cyber Grid',
    swatch: 'linear-gradient(135deg, #08090c 0%, #0a2a2a 100%)',
    baseColor: '#08090c',
    layers: [
      {
        opacity: 0.2,
        backgroundImage:
          'linear-gradient(rgba(0, 240, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.6) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      },
      {
        backgroundImage:
          'radial-gradient(circle at 60% 40%, rgba(0, 240, 255, 0.08), transparent 70%), radial-gradient(circle at 20% 80%, rgba(0, 255, 102, 0.06), transparent 60%)',
      },
    ],
  },
  {
    id: 'sunset',
    label: 'Sunset',
    swatch: 'linear-gradient(160deg, #ff9966, #ff5e62, #2b0a3d)',
    baseColor: '#1a0a12',
    layers: [
      {
        backgroundImage:
          'linear-gradient(160deg, #ff9966 0%, #ff5e62 45%, #2b0a3d 100%)',
      },
    ],
  },
  {
    id: 'ocean',
    label: 'Ocean',
    swatch: 'linear-gradient(160deg, #0f2027, #203a43, #2c5364)',
    baseColor: '#0f2027',
    layers: [
      {
        backgroundImage:
          'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      },
    ],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    swatch: 'linear-gradient(160deg, #0a0f1c, #142850, #00d4b1)',
    baseColor: '#0a0f1c',
    layers: [
      {
        backgroundImage:
          'linear-gradient(160deg, #0a0f1c 0%, #142850 45%, #00d4b1 100%)',
      },
    ],
  },
  photoWallpaper('spiderman-swing', 'Spider-Man', spidermanBack),
  photoWallpaper('spiderman-iron', 'Iron Spider', ironSpider),
  photoWallpaper('spiderman-stealth', 'Spider-Man (Stealth)', spidermanStealth),
  photoWallpaper('windows11', 'Windows 11', windows11),
]
