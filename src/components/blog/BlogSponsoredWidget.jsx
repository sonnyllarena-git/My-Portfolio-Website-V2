import { gamesCatalog } from '../../data/gamesCatalog.js'

const SPONSORED_CAPTIONS = {
  'flappy-bird': 'Play the best flappy game',
  'typing-speed': 'Test your typing speed',
  'memory-flip': 'Flip your favorite Youtuber',
}

function BlogSponsoredWidget({ onOpenGames }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">Sponsored</h3>
      <ul className="space-y-6">
        {gamesCatalog.map((game) => (
          <li key={game.id} className="flex flex-col gap-2">
            <span className="text-sm text-slate-600">
              {SPONSORED_CAPTIONS[game.id]}
            </span>
            <button
              type="button"
              onClick={() => onOpenGames?.()}
              aria-label={`Open Games — ${game.title}`}
              className="h-56 w-full cursor-pointer overflow-hidden rounded-lg bg-slate-100 hover:opacity-80"
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="h-full w-full object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogSponsoredWidget
