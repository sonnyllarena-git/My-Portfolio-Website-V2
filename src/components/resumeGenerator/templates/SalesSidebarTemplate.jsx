function SidebarHeading({ children }) {
  return (
    <h2 className="mb-2 text-sm font-bold tracking-wide uppercase">
      {children}
    </h2>
  )
}

function SalesSidebarTemplate({ resumeData }) {
  const {
    personalInfo,
    workExperience,
    education,
    trainings,
    achievements,
    projects,
    summary,
  } = resumeData

  return (
    <div className="mx-auto flex w-[8.5in] min-h-[11in] gap-6 border border-black/10 bg-white p-10 text-black">
      <aside className="flex w-1/3 flex-col gap-5">
        {personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt="Profile"
            className="h-28 w-28 rounded object-cover"
          />
        )}
        <div className="flex flex-col gap-1 text-sm">
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>

        {education.length > 0 && (
          <section>
            <SidebarHeading>Education</SidebarHeading>
            {education.map((edu, index) => (
              <div key={index} className="mb-2 text-sm">
                <p className="text-black/60">
                  {edu.startDate} - {edu.endDate}
                </p>
                <p className="font-medium">{edu.school}</p>
                <p>{edu.degree}</p>
              </div>
            ))}
          </section>
        )}

        {trainings.length > 0 && (
          <section>
            <SidebarHeading>Certifications</SidebarHeading>
            <ul className="list-disc pl-4 text-sm">
              {trainings.map((training, index) => (
                <li key={index}>{training.name}</li>
              ))}
            </ul>
          </section>
        )}

        {achievements.length > 0 && (
          <section>
            <SidebarHeading>Achievements</SidebarHeading>
            <ul className="list-disc pl-4 text-sm">
              {achievements.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="flex w-2/3 flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.targetRole && (
            <p className="text-black/60">{personalInfo.targetRole}</p>
          )}
        </div>

        {summary && (
          <section>
            <SidebarHeading>Professional Summary</SidebarHeading>
            <div dangerouslySetInnerHTML={{ __html: summary }} />
          </section>
        )}

        {workExperience.length > 0 && (
          <section>
            <SidebarHeading>Work Experience</SidebarHeading>
            {workExperience.map((job, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>{job.title}</span>
                  <span>
                    {job.employer} | {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SidebarHeading>Projects</SidebarHeading>
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>{project.name}</span>
                  <span>{project.date}</span>
                </div>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default SalesSidebarTemplate
