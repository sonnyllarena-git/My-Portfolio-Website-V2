import { useState } from 'react'
import { useSandboxCollection } from './useSandboxCollection.js'
import AdminResumeTemplateForm from '../admin/AdminResumeTemplateForm.jsx'
import AdminResumeTemplatePreview from '../admin/AdminResumeTemplatePreview.jsx'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_TEXT,
} from '../admin/adminTheme.js'

async function sandboxUploadFile(file) {
  return URL.createObjectURL(file)
}

export default function GuestAdminResumeTemplatesPage() {
  const {
    items: templates,
    loading,
    add,
    update,
    remove,
    publish,
  } = useSandboxCollection('/api/resume-templates?published=true', 'TPL')
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [previewingTemplate, setPreviewingTemplate] = useState(null)

  function sandboxSavePayload(payload, existingTemplate) {
    return existingTemplate
      ? update(existingTemplate.code, payload)
      : add(payload)
  }

  function handleSaved() {
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

  function handleDelete(template) {
    if (!window.confirm(`Delete ${template.name}?`)) return
    remove(template.code)
  }

  function handlePublish(template) {
    setPreviewingTemplate(publish(template.code))
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
          onCancel={() => setShowForm(false)}
          savePayload={sandboxSavePayload}
          uploadFile={sandboxUploadFile}
        />
      )}
      {previewingTemplate && (
        <AdminResumeTemplatePreview
          template={previewingTemplate}
          onClose={() => setPreviewingTemplate(null)}
          onPublish={handlePublish}
          publishing={false}
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
