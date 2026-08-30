import { RESUME_TEMPLATES } from '../components/resumeGenerator/templates/index.js'
import { sampleResumeData } from '../components/resumeGenerator/templates/sampleResumeData.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

export default function AdminResumeTemplatePreview({
  template,
  onClose,
  onPublish,
  publishing,
}) {
  const TemplateComponent = RESUME_TEMPLATES[template.templateKey]?.component

  return (
    <div
      className={`mb-4 overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
    >
      <div
        className={`flex items-center justify-between border-b ${ADMIN_CARD_BORDER} p-3`}
      >
        <p className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          Previewing with sample resume data —{' '}
          {template.published
            ? 'published'
            : 'draft, not visible to visitors yet'}
        </p>
        <div className="flex gap-2">
          {!template.published && (
            <button
              type="button"
              onClick={() => onPublish(template)}
              disabled={publishing}
              className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50`}
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-1.5 text-sm`}
          >
            Close preview
          </button>
        </div>
      </div>
      {TemplateComponent ? (
        <TemplateComponent resumeData={sampleResumeData} />
      ) : (
        <p className="p-6 text-sm text-red-600">
          No coded component registered for templateKey "{template.templateKey}
          ".
        </p>
      )}
    </div>
  )
}
