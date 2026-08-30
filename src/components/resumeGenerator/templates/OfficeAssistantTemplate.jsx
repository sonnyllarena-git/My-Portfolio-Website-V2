function OfficeAssistantTemplate({ resumeData }) {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    summary,
    references,
  } = resumeData
  const reference = references[0]

  return (
    <div className="mx-auto w-[8.5in] min-h-[11in] border border-black/10 bg-white p-10 text-black">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.targetRole && (
            <p className="mt-1 text-lg font-bold tracking-wide uppercase">
              {personalInfo.targetRole}
            </p>
          )}
          <div className="mt-3 flex flex-col gap-1 text-sm">
            {personalInfo.address && <span>📍 {personalInfo.address}</span>}
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.email && <span>✉️ {personalInfo.email}</span>}
          </div>
        </div>
        {personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt="Profile"
            className="h-28 w-24 rounded object-cover"
          />
        )}
      </div>

      <hr className="my-5 border-black" />

      {summary && (
        <section className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase">Career Overview</h2>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {education.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-bold uppercase">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2 text-sm">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-black/60">
                    {edu.school} | {edu.startDate}
                  </p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-bold uppercase">Skills</h2>
              <ul className="list-disc pl-4 text-sm">
                {skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}

          {reference && (
            <section>
              <h2 className="mb-2 text-lg font-bold uppercase">Reference</h2>
              <p className="text-sm font-medium">{reference.name}</p>
              <p className="text-sm text-black/60">{reference.titleCompany}</p>
              <p className="text-sm text-black/60">{reference.email}</p>
              <p className="text-sm text-black/60">{reference.phone}</p>
            </section>
          )}
        </div>

        <section>
          <h2 className="mb-2 text-lg font-bold uppercase">Experience</h2>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm font-bold underline">{job.title}</p>
              <p className="mb-1 text-sm text-black/60">
                {job.employer} | {job.startDate} - {job.endDate}
              </p>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default OfficeAssistantTemplate
