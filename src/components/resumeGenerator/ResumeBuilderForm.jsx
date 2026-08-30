import { useState } from 'react'
import { useResumeGenerator } from './ResumeGeneratorContext.jsx'
import TemplatePickerScreen from './TemplatePickerScreen.jsx'
import ResumeLivePreview from './ResumeLivePreview.jsx'
import PersonalInfoSection from './sections/PersonalInfoSection.jsx'
import WorkExperienceSection from './sections/WorkExperienceSection.jsx'
import EducationSection from './sections/EducationSection.jsx'
import TrainingsSection from './sections/TrainingsSection.jsx'
import SkillsSection from './sections/SkillsSection.jsx'
import ProjectsSection from './sections/ProjectsSection.jsx'
import AchievementsSection from './sections/AchievementsSection.jsx'
import ReferencesSection from './sections/ReferencesSection.jsx'
import ProfessionalSummarySection from './sections/ProfessionalSummarySection.jsx'

const SECTION_STEPS = [
  PersonalInfoSection,
  WorkExperienceSection,
  EducationSection,
  TrainingsSection,
  SkillsSection,
  ProjectsSection,
  AchievementsSection,
  ReferencesSection,
  ProfessionalSummarySection,
]

const LAST_STEP = SECTION_STEPS.length + 1

function ResumeBuilderForm() {
  const { setSelectedTemplateKey } = useResumeGenerator()
  const [step, setStep] = useState(0)
  const [returnStep, setReturnStep] = useState(1)

  function goToStep(index) {
    setStep(Math.max(0, Math.min(LAST_STEP, index)))
  }

  function handleChangeTemplate() {
    setReturnStep(LAST_STEP)
    goToStep(0)
  }

  function handleSelectTemplate(templateKey) {
    setSelectedTemplateKey(templateKey)
    goToStep(returnStep)
  }

  const isFirstStep = step === 0
  const isLastStep = step === LAST_STEP
  const SectionComponent = SECTION_STEPS[step - 1]

  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex-1 overflow-auto">
        {step === 0 && <TemplatePickerScreen onSelect={handleSelectTemplate} />}
        {isLastStep && (
          <ResumeLivePreview onChangeTemplate={handleChangeTemplate} />
        )}
        {!isFirstStep && !isLastStep && <SectionComponent />}
      </div>
      {!isFirstStep && (
        <div className="flex items-center justify-between border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className="rounded px-4 py-1.5 text-sm hover:bg-white/10"
          >
            Back
          </button>
          <div className="flex gap-1">
            {Array.from({ length: LAST_STEP + 1 }, (_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${
                  index === step ? 'bg-blue-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          {!isLastStep ? (
            <button
              type="button"
              onClick={() => goToStep(step + 1)}
              className="rounded bg-blue-600 px-4 py-1.5 text-sm hover:bg-blue-500"
            >
              Next
            </button>
          ) : (
            <span className="w-16" />
          )}
        </div>
      )}
    </div>
  )
}

export default ResumeBuilderForm
