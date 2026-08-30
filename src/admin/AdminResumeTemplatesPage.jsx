import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import AdminResumeTemplateForm from './AdminResumeTemplateForm.jsx'
import AdminResumeTemplatePreview from './AdminResumeTemplatePreview.jsx'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_TEXT,
} from './adminTheme.js'

export default function AdminResumeTemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [previewingTemplate, setPreviewingTemplate] = useState(null)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    apiFetch('/resume-templates')
      .then(setTemplates)
      .finally(() => setLoading(false))
  }, [])

  function handleSaved(template) {
    setTemplates((prev) =>
      prev.some((t) => t.code === template.code)
        ? prev.map((t) => (t.code === template.code ? template : t))
        : [...prev, template],
    )
    setShowForm(false)
    setEditingTemplate(null)
  }

  function handleAddClick() {
    setEditingTemplate(null)
    setShowForm(true)
  }

  function handleEditClick(template) {
    setEditingTemplate(template)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingTemplate(null)
  }

  async function handleDelete(template) {
    if (!window.confirm(`Delete ${template.name}?`)) return
    await apiFetch(`/resume-templates/${template.code}`, { method: 'DELETE' })
    setTemplates((prev) => prev.filter((t) => t.code !== template.code))
  }

  async function handlePublish(template) {
    setPublishing(true)
    try {
      const published = await apiFetch(
        `/resume-templates/${template.code}/publish`,
        { method: 'PATCH' },
      )
      setTemplates((prev) =>
        prev.map((t) => (t.code === published.code ? published : t)),
      )
      setPreviewingTemplate(published)
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Resume Templates</h1>
        <button
          onClick={handleAddClick}
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Add template
        </button>
      </div>
      {showForm && (
        <AdminResumeTemplateForm
          template={editingTemplate}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      )}
      {previewingTemplate && (
        <AdminResumeTemplatePreview
          template={previewingTemplate}
          onClose={() => setPreviewingTemplate(null)}
          onPublish={handlePublish}
          publishing={publishing}
        />
      )}
      <div
        className={`overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
            >
              <th className="px-4 py-2 font-medium">Code</th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Template</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && templates.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No templates yet.
                </td>
              </tr>
            )}
            {templates.map((template) => (
              <tr
                key={template.code}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2">{template.code}</td>
                <td className="px-4 py-2">{template.name}</td>
                <td className="px-4 py-2">{template.templateKey}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      template.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {template.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="flex gap-3 px-4 py-2">
                  <button
                    onClick={() => setPreviewingTemplate(template)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleEditClick(template)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
