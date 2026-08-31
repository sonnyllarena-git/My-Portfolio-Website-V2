import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
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

function buildResumeFilename(personalInfo) {
  const name = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()
  return `${name || 'Resume'} Resume`
}

function ResumeLivePreview({ onChangeTemplate }) {
  const context = useResumeGenerator()
  const template = RESUME_TEMPLATES[context.selectedTemplateKey]
  const previewRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  if (!template) {
    return <p className="p-6 text-sm text-white/60">No template selected.</p>
  }

  const TemplateComponent = template.component
  const resumeData = resolveResumeData(context)

  async function handleDownloadPdf() {
    if (!previewRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
      const imageData = canvas.toDataURL('image/jpeg', 0.95)

      const pdf = new jsPDF({ unit: 'in', format: 'letter' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imageHeight = (canvas.height * pageWidth) / canvas.width

      let heightLeft = imageHeight
      let position = 0
      pdf.addImage(imageData, 'JPEG', 0, position, pageWidth, imageHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imageHeight
        pdf.addPage()
        pdf.addImage(imageData, 'JPEG', 0, position, pageWidth, imageHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${buildResumeFilename(resumeData.personalInfo)}.pdf`)
    } catch (err) {
      console.error('Failed to generate PDF:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-1 border-b border-white/10 p-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onChangeTemplate}
            className="text-sm text-blue-400 hover:underline"
          >
            Change template
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded border border-white/20 px-4 py-1.5 text-sm text-white hover:bg-white/10"
            >
              Print
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {downloading ? 'Preparing PDF…' : 'Download PDF'}
            </button>
          </div>
        </div>
        <p className="text-right text-xs text-white/40">
          Printing to paper instead? Uncheck "Headers and footers" under More
          settings in the print dialog for a clean page.
        </p>
      </div>
      <div className="flex-1 overflow-auto">
        <div ref={previewRef}>
          <TemplateComponent resumeData={resumeData} />
        </div>
      </div>
      {createPortal(
        <div className="resume-generator-print-area">
          <TemplateComponent resumeData={resumeData} />
        </div>,
        document.body,
      )}
    </div>
  )
}

export default ResumeLivePreview
