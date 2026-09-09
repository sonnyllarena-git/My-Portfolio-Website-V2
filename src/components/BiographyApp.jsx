import profilePhoto from './blog/assets/icons/profile photo.png'
import { useIsMobile } from '../hooks/useIsMobile.js'

const HIGHLIGHTS = [
  'Designed and built this entire Windows-11-style desktop experience from scratch — icons, draggable windows, a working file explorer, and a taskbar with a live clock.',
  'Brings real IT Specialist experience to how this site is built: hands-on with Microsoft 365, Azure, Salesforce, and Jira/Confluence administration, plus workflow automation with Power Automate, Zapier, and n8n.',
  'Founder of Faithline Digital Marketing, a digital marketing startup — the same social media management and content instincts show up in how this portfolio is put together.',
  'Added a real Postgres-backed arcade, a moderated community wall, and a shared drawing gallery — all backed by a real database instead of resetting on reload.',
  'Treats mobile responsiveness and security as first-class, not afterthoughts — every feature gets tested end-to-end in a real browser before it ships.',
]

const BUILT_WITH = [
  'React',
  'Node.js / Express',
  'PostgreSQL',
  'Tailwind CSS',
  'Framer Motion',
]

const PROFESSIONAL_SKILLS = [
  'Microsoft 365 & Azure Administration',
  'Salesforce Administration',
  'Jira & Confluence Administration',
  'Workflow Automation (Power Automate, Zapier, n8n)',
  'IT Support & Helpdesk',
  'Social Media Content Creation',
  'Canva · Adobe Photoshop · Premiere Pro',
]

const EDUCATION = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'FAITH Colleges',
}

const TRAINING = [
  'AWS Cloud Practitioner Fundamentals',
  'Microsoft Azure Fundamentals (AZ-900)',
  'ITIL® 4 Foundation',
  'Agile Scrum & Scrum Master Foundations',
  'Jira Advanced Administration',
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
          <p className="mt-1 text-xs text-white/40">📍 Batangas, Philippines</p>
          <p className="mt-4 leading-relaxed text-white/80">
            Sonny designed and built this entire interactive portfolio from the
            ground up — a full Windows-11-styled desktop experience, complete
            with a working file explorer, a real database-backed arcade, a
            moderated community wall, and a shared drawing gallery.
          </p>
          <p className="mt-3 leading-relaxed text-white/80">
            By day, he works as an IT Specialist — administering Microsoft 365,
            Azure, Salesforce, and Jira/Confluence, and building out workflow
            automation with tools like Power Automate, Zapier, and n8n. That
            same instinct for finding the efficient path shows up throughout
            this site, from its database-backed features to the mobile-first
            layout every app gets built with.
          </p>
          <p className="mt-3 leading-relaxed text-white/80">
            He&apos;s also the founder of Faithline Digital Marketing, a digital
            marketing startup, and brings that social media management and
            content-creation background into the more visual, shareable parts of
            this experience.
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
          {BUILT_WITH.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          Professional Skills
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROFESSIONAL_SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          Education
        </h2>
        <p className="mt-3 text-sm text-white/70">
          {EDUCATION.degree} — {EDUCATION.school}
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          Training &amp; Professional Development
        </h2>
        <ul className="mt-3 space-y-1.5 text-sm text-white/70">
          {TRAINING.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="shrink-0 text-cyan-400">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-3xl border-t border-white/10 pt-4 text-center text-[11px] text-white/40">
        © 2026 Sonny. All rights reserved.
      </p>
    </div>
  )
}

export default BiographyApp
