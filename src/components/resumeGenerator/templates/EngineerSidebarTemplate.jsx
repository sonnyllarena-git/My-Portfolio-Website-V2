const ACCENT = 'text-indigo-700'
const ACCENT_BORDER = 'border-indigo-700'

function SectionHeading({ children }) {
  return <h2 className={`mb-2 text-base font-bold ${ACCENT}`}>{children}</h2>
}

function EngineerSidebarTemplate({ resumeData }) {
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    trainings,
    achievements,
    summary,
  } = resumeData

  return (
    <div
      className={`mx-auto w-[8.5in] min-h-[11in] border-2 ${ACCENT_BORDER} bg-white p-10 text-black`}
    >
      <div className="flex items-start gap-4">
        {personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt="Profile"
            className="h-20 w-20 rounded object-cover"
          />
        )}
        <div>
          <h1 className={`text-2xl font-bold ${ACCENT}`}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-sm">
            {personalInfo.address && (
              <>
                <span className="font-semibold">Address:</span>
                <span>{personalInfo.address}</span>
              </>
            )}
            {personalInfo.phone && (
              <>
                <span className="font-semibold">Phone:</span>
                <span>{personalInfo.phone}</span>
              </>
            )}
            {personalInfo.email && (
              <>
                <span className="font-semibold">Email:</span>
                <span>{personalInfo.email}</span>
              </>
            )}
            {personalInfo.website && (
              <>
                <span className="font-semibold">Website:</span>
                <span>{personalInfo.website}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <hr className={`my-5 ${ACCENT_BORDER}`} />

      {summary && (
        <section className="mb-6">
          <SectionHeading>Summary</SectionHeading>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Work Experience</SectionHeading>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span>
                  {job.title}, {job.employer}
                </span>
                <span>
                  {job.startDate} - {job.endDate}
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

      {education.length > 0 && (
        <section className="mb-6">
          <SectionHeading>Education</SectionHeading>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span>{edu.degree}</span>
                <span>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm">{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      <section>
        <SectionHeading>Additional Information</SectionHeading>
        <ul className="list-disc pl-4 text-sm">
          {skills.length > 0 && (
            <li>
              <span className="font-semibold">Technical Skills:</span>{' '}
              {skills.map((skill) => skill.name).join(', ')}
            </li>
          )}
          {trainings.length > 0 && (
            <li>
              <span className="font-semibold">Certifications:</span>{' '}
              {trainings.map((training) => training.name).join(', ')}
            </li>
          )}
          {achievements.length > 0 && (
            <li>
              <span className="font-semibold">Awards &amp; Activities:</span>{' '}
              {achievements.map((item) => item.description).join(', ')}
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default EngineerSidebarTemplate
