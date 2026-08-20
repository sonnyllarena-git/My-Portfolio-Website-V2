import headerArt from './assets/components/header.png'
import lifeIcon from './assets/components/life.png'

export default function MemoryHud({ level, lives, maxLives }) {
  return (
    <div className="w-full max-w-lg rounded-xl bg-black/20 p-3 text-white backdrop-blur-sm">
      <div className="relative w-full" style={{ aspectRatio: '1640 / 400' }}>
        <img src={headerArt} alt="Memory Flip" className="h-full w-full" />
        <span
          className="absolute -translate-x-1/2 text-lg font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ left: '50%', top: '38%' }}
        >
          {level}
        </span>
        <div
          className="absolute grid -translate-x-1/2 grid-cols-5 gap-0.5"
          style={{ left: '84%', top: '51%' }}
        >
          {Array.from({ length: maxLives }, (_, i) => (
            <img
              key={i}
              src={lifeIcon}
              alt=""
              className={`h-6 w-auto ${i < lives ? '' : 'opacity-20 grayscale'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
