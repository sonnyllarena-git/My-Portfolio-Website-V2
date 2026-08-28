import { contactInfo } from '../data/contactInfo.js'
import SocialIcon from './contactCard/SocialIcon.jsx'
import neonCardPhoto from './contactCard/assets/Black.png'
import bgVideo from '../assets/HD background.mp4'
import { useIsMobile } from '../hooks/useIsMobile.js'

function ContactInfoApp() {
  const isMobile = useIsMobile()

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-auto p-6 text-white">
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-400/40 bg-black/60 ${
          isMobile
            ? 'flex flex-col gap-6 p-6'
            : 'flex gap-6 px-6 py-8 md:gap-10 md:px-10'
        }`}
      >
        <div
          className={
            isMobile
              ? 'flex w-full flex-col gap-4'
              : 'flex min-w-0 grow-[55] basis-0 flex-col gap-4 self-stretch'
          }
        >
          <img
            src={neonCardPhoto}
            alt="Sonny Llarena"
            className={
              isMobile
                ? 'h-64 w-full shrink-0 rounded-2xl object-contain'
                : 'min-h-0 flex-1 rounded-2xl object-contain'
            }
          />
          <div>
            <h2 className="text-xl font-bold text-cyan-300 md:text-2xl">
              Sonny Llarena
            </h2>
            <p className="text-sm font-semibold text-cyan-300 md:text-base">
              Fullstack Developer, IT Specialist
            </p>
            <p className="text-sm font-semibold text-cyan-300 md:text-base">
              Social Media Management
            </p>
            <p className="mt-3 text-xs text-white/60">{contactInfo.tagline}</p>
          </div>
        </div>
        <div
          className={`flex min-w-0 flex-col justify-center gap-2 ${
            isMobile ? 'w-full' : 'grow-[45] basis-0'
          }`}
        >
          {contactInfo.profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10"
            >
              <SocialIcon kind={profile.kind} />
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold">
                  {profile.label}
                </span>
                {profile.value && (
                  <span className="block truncate text-sm text-white/50">
                    {profile.value}
                  </span>
                )}
              </span>
              <span className="text-lg text-white/30">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInfoApp
