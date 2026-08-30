import { useResumeGenerator } from '../ResumeGeneratorContext.jsx'
import RichTextField from '../RichTextField.jsx'

function ProfessionalSummarySection() {
  const { summary, setSummary } = useResumeGenerator()

  return (
    <div className="p-6">
      <RichTextField
        value={summary}
        onChange={setSummary}
        placeholder="Write 2-4 short, energetic sentences about your experience and skills."
      />
    </div>
  )
}

export default ProfessionalSummarySection
