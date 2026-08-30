import { useResumeTemplates } from '../../context/ResumeTemplatesContext.jsx'

function TemplatePickerScreen({ onSelect }) {
  const { templates, loading, error } = useResumeTemplates()

  if (loading) {
    return <p className="p-6 text-sm text-white/60">Loading templates…</p>
  }

  if (error) {
    return <p className="p-6 text-sm text-red-400">{error}</p>
  }

  if (templates.length === 0) {
    return (
      <p className="p-6 text-sm text-white/60">
        No resume templates are available yet — please check back soon.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
      {templates.map((template) => (
        <button
          key={template.code}
          type="button"
          onClick={() => onSelect(template.templateKey)}
          className="flex flex-col items-center gap-2 rounded border border-white/10 p-3 text-left hover:border-white/40"
        >
          {template.thumbnailUrl ? (
            <img
              src={template.thumbnailUrl}
              alt={template.name}
              className="h-32 w-full rounded object-cover"
            />
          ) : (
            <div
              className="h-32 w-full rounded"
              style={{ backgroundColor: template.accentHex || '#333' }}
            />
          )}
          <span className="text-sm font-medium">{template.name}</span>
        </button>
      ))}
    </div>
  )
}

export default TemplatePickerScreen
