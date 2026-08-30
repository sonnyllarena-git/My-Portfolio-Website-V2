function SectionHeading({ children }) {
  return (
    <h2 className="mb-2 text-lg font-semibold tracking-wide uppercase">
      {children}
    </h2>
  )
}

function ClassicTemplate({ resumeData }) {
  const {
    personalInfo,
    workExperience,
    education,
    trainings,
    skills,
    summary,
  } = resumeData

  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.address,
    personalInfo.cityState,
    personalInfo.country,
  ]
    .filter(Boolean)
    .join(' • ')

  return (
    <div className="mx-auto w-[8.5in] min-h-[11in] bg-white p-10 text-black">
      <header className="mb-6 border-b border-black/20 pb-4">
        <h1 className="text-3xl font-bold">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.targetRole && (
          <p className="text-lg text-black/70">{personalInfo.targetRole}</p>
        )}
        {contactLine && (
          <p className="mt-2 text-sm text-black/60">{contactLine}</p>
        )}
      </header>

      {summary && (
        <section className="mb-6">
          <SectionHeading>Professional Summary</SectionHeading>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Professional Experience</SectionHeading>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  {job.title} — {job.employer}
                </span>
                <span>
                  {job.startDate} – {job.endDate}
                </span>
              </div>
              <p className="text-sm text-black/60">{job.cityState}</p>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Education</SectionHeading>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  {edu.degree} — {edu.school}
                </span>
                <span>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <p className="text-sm text-black/60">{edu.cityState}</p>
              <div dangerouslySetInnerHTML={{ __html: edu.description }} />
            </div>
          ))}
        </section>
      )}

      {trainings.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Trainings &amp; Certifications</SectionHeading>
          {trainings.map((training, index) => (
            <div key={index} className="mb-2 flex justify-between text-sm">
              <span>
                {training.name} — {training.issuer}
              </span>
              <span>{training.date}</span>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <SectionHeading>Skills</SectionHeading>
          <div className="flex flex-wrap gap-2 text-sm">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-black/20 px-3 py-1"
              >
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate
