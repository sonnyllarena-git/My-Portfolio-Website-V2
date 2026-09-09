import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import AdminProjectForm from './AdminProjectForm.jsx'
import AdminProjectPreview from './AdminProjectPreview.jsx'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_TEXT,
} from './adminTheme.js'

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [previewingProject, setPreviewingProject] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    apiFetch('/projects')
      .then(setProjects)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  function handleSaved(project) {
    setProjects((prev) =>
      prev.some((p) => p.code === project.code)
        ? prev.map((p) => (p.code === project.code ? project : p))
        : [...prev, project],
    )
    setShowForm(false)
    setEditingProject(null)
  }

  function handleAddClick() {
    setEditingProject(null)
    setShowForm(true)
  }

  function handleEditClick(project) {
    setEditingProject(project)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingProject(null)
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete ${project.title}?`)) return
    try {
      await apiFetch(`/projects/${project.code}`, { method: 'DELETE' })
      setProjects((prev) => prev.filter((p) => p.code !== project.code))
    } catch (err) {
      window.alert(err.message || 'Failed to delete project')
    }
  }

  async function handlePublish(project) {
    setPublishing(true)
    try {
      const published = await apiFetch(`/projects/${project.code}/publish`, {
        method: 'PATCH',
      })
      setProjects((prev) =>
        prev.map((p) => (p.code === published.code ? published : p)),
      )
      setPreviewingProject(published)
    } finally {
      setPublishing(false)
    }
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
          onCancel={handleCancel}
        />
      )}
      {previewingProject && (
        <AdminProjectPreview
          project={previewingProject}
          onClose={() => setPreviewingProject(null)}
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
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadError && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-red-600">
                  Failed to load projects.
                </td>
              </tr>
            )}
            {!loading && !loadError && projects.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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
                <td className="flex gap-3 px-4 py-2">
                  <button
                    onClick={() => setPreviewingProject(project)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleEditClick(project)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
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
