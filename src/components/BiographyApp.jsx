import profilePhoto from './blog/assets/icons/profile photo.png'
import { useIsMobile } from '../hooks/useIsMobile.js'

const HIGHLIGHTS = [
  'Designed and built this entire Windows-11-style desktop experience from scratch — icons, draggable windows, a working file explorer, and a taskbar with a live clock.',
  'Added a real Postgres-backed arcade: a shared leaderboard, ratings, and even a hidden Terminal command for admin access.',
  'Built a moderated community wall and a shared drawing gallery, both backed by a real database instead of resetting on reload.',
  'Treats mobile responsiveness and security as first-class, not afterthoughts — every feature gets tested end-to-end in a real browser before it ships.',
]

const SKILLS = [
  'React',
  'Node.js / Express',
  'PostgreSQL',
  'Tailwind CSS',
  'Framer Motion',
]

function BiographyApp() {
  const isMobile = useIsMobile()

  return (
    <div className="h-full overflow-y-auto bg-[#0d0d0d] p-6 text-white md:p-10">
      <div
        className={`mx-auto flex max-w-3xl gap-6 ${isMobile ? 'flex-col items-center text-center' : 'items-start'}`}
      >
        <img
          src={profilePhoto}
          alt="Sonny Llarena"
          className="h-28 w-28 shrink-0 rounded-full border-2 border-cyan-400/50 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-cyan-300">Sonny Llarena</h1>
          <p className="mt-1 text-sm font-semibold text-white/70">
            Fullstack Developer · IT Specialist · Social Media Management
          </p>
          <p className="mt-4 leading-relaxed text-white/80">
            Sonny designed and built this entire interactive portfolio from the
            ground up — a full Windows-11-styled desktop experience, complete
            with a working file explorer, a real database-backed arcade, a
            moderated community wall, and a shared drawing gallery.
          </p>
          <p className="mt-3 leading-relaxed text-white/80">
            He has a genuine eye for detail: nothing ships until it&apos;s been
            tested end-to-end in a real browser, mobile responsiveness gets the
            same care as desktop, and security gets a second look before a
            feature is considered done. Beyond the code, his background in IT
            and social media management shows in how this portfolio balances
            technical depth with a genuinely fun, shareable visitor experience.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          Highlights
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="shrink-0 text-cyan-400">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          Built With
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-3xl border-t border-white/10 pt-4 text-center text-[11px] text-white/40">
        © 2026 Sonny. All rights reserved.
      </p>
    </div>
  )
}

export default BiographyApp
