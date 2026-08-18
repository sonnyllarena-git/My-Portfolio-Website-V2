import { contactInfo } from '../../data/contactInfo.js'

function getField(label) {
  return contactInfo.fields.find((field) => field.label === label)?.value
}

function ContactPage() {
  const name = getField('Name')
  const role = getField('Role')
  const location = getField('Based In')
  const phone = getField('Phone and WhatsApp')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-[#181a20] p-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold">
          {name?.charAt(0)}
        </div>
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-white/60">{role}</div>
          <div className="text-xs text-white/40">{location}</div>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
        <h3 className="mb-2 text-sm font-semibold text-white/70 uppercase">
          Contact Info
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span>📞</span>
          {phone}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-[#181a20] p-4">
        <h3 className="mb-3 text-sm font-semibold text-white/70 uppercase">
          Social Links
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {contactInfo.profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              {profile.label}
              <span>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
