import { useState } from 'react'
import { useSandboxCollection } from './useSandboxCollection.js'
import AdminProjectForm from '../admin/AdminProjectForm.jsx'
import AdminProjectPreview from '../admin/AdminProjectPreview.jsx'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
} from '../admin/adminTheme.js'

async function sandboxUploadFile(file) {
  return URL.createObjectURL(file)
}

export default function GuestAdminProjectsPage() {
  const {
    items: projects,
    loading,
    add,
    update,
    publish,
  } = useSandboxCollection('/api/projects?published=true', 'PROJ')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [previewingProject, setPreviewingProject] = useState(null)

  function sandboxSavePayload(payload, existingProject) {
    return existingProject
      ? update(existingProject.code, payload)
      : add(payload)
  }

  function handleSaved() {
    setShowForm(false)
    setEditingProject(null)
  }

  function handleAddClick() {
    setEditingProject(null)
    setShowForm(true)
  }

  function handlePublish(project) {
    setPreviewingProject(publish(project.code))
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Projects</h1>
        <button
          onClick={handleAddClick}
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Add project
        </button>
      </div>
      {showForm && (
        <AdminProjectForm
          project={editingProject}
          onSaved={handleSaved}
          onCancel={() => setShowForm(false)}
          savePayload={sandboxSavePayload}
          uploadFile={sandboxUploadFile}
        />
      )}
      {previewingProject && (
        <AdminProjectPreview
          project={previewingProject}
          onClose={() => setPreviewingProject(null)}
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
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {!loading && projects.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No projects yet.
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr
                key={project.code}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2">{project.code}</td>
                <td className="px-4 py-2">{project.title}</td>
                <td className="px-4 py-2">{project.category}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      project.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
