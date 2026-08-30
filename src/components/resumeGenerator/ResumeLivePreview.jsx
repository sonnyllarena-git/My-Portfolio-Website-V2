import { useResumeGenerator } from './ResumeGeneratorContext.jsx'
import { RESUME_TEMPLATES } from './templates/index.js'
import { sampleResumeData } from './templates/sampleResumeData.js'

function isEmptyList(value) {
  return !Array.isArray(value) || value.length === 0
}

function resolveResumeData(context) {
  const personalInfo = Object.keys(sampleResumeData.personalInfo).reduce(
    (acc, key) => {
      acc[key] = context.personalInfo[key] || sampleResumeData.personalInfo[key]
      return acc
    },
    {},
  )

  return {
    personalInfo,
    workExperience: isEmptyList(context.workExperience)
      ? sampleResumeData.workExperience
      : context.workExperience,
    education: isEmptyList(context.education)
      ? sampleResumeData.education
      : context.education,
    trainings: isEmptyList(context.trainings)
      ? sampleResumeData.trainings
      : context.trainings,
    skills: isEmptyList(context.skills)
      ? sampleResumeData.skills
      : context.skills,
    summary: context.summary || sampleResumeData.summary,
    references: isEmptyList(context.references)
      ? sampleResumeData.references
      : context.references,
    achievements: isEmptyList(context.achievements)
      ? sampleResumeData.achievements
      : context.achievements,
    projects: isEmptyList(context.projects)
      ? sampleResumeData.projects
      : context.projects,
  }
}

function ResumeLivePreview({ onChangeTemplate }) {
  const context = useResumeGenerator()
  const template = RESUME_TEMPLATES[context.selectedTemplateKey]

  if (!template) {
    return <p className="p-6 text-sm text-white/60">No template selected.</p>
  }

  const TemplateComponent = template.component
  const resumeData = resolveResumeData(context)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 p-3">
        <button
          type="button"
          onClick={onChangeTemplate}
          className="text-sm text-blue-400 hover:underline"
        >
          Change template
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-500"
        >
          Print / Save as PDF
        </button>
      </div>
      <div className="resume-generator-print-area flex-1 overflow-auto">
        <TemplateComponent resumeData={resumeData} />
      </div>
    </div>
  )
}

export default ResumeLivePreview
