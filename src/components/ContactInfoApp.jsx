import { motion } from 'framer-motion'
import { contactInfo } from '../data/contactInfo.js'
import SocialIcon from './contactCard/SocialIcon.jsx'
import sIcon from '../assets/icons/S icon.png'
import bgVideo from '../assets/HD background.mp4'

function getField(label) {
  return contactInfo.fields.find((field) => field.label === label)?.value
}

function ContactInfoApp() {
  const name = getField('Name')
  const role = getField('Role')

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-auto p-6">
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full max-w-sm rounded-2xl border border-cyan-400/20 bg-[#0b1220]/60 p-6 shadow-2xl shadow-black/50 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <img
            src={sIcon}
            alt=""
            className="h-14 w-14 rounded-xl border border-white/10"
          />
          <div>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-white/60">{role}</div>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {contactInfo.profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur-sm transition hover:bg-white/10"
            >
              <SocialIcon kind={profile.kind} />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{profile.label}</span>
                {profile.value && (
                  <span className="block truncate text-xs text-white/50">
                    {profile.value}
                  </span>
                )}
              </span>
              <span className="text-white/30">↗</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ContactInfoApp
