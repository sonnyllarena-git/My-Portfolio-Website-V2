import './resumeGeneratorPrint.css'
import { ResumeGeneratorProvider } from './ResumeGeneratorContext.jsx'
import { ResumeTemplatesProvider } from '../../context/ResumeTemplatesContext.jsx'
import ResumeBuilderForm from './ResumeBuilderForm.jsx'

function ResumeGeneratorApp() {
  return (
    <ResumeTemplatesProvider>
      <ResumeGeneratorProvider>
        <ResumeBuilderForm />
      </ResumeGeneratorProvider>
    </ResumeTemplatesProvider>
  )
}

export default ResumeGeneratorApp
