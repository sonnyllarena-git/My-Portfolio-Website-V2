import { useState } from 'react'
import { apiFetch } from './api.js'
import { useProjectCategories } from '../hooks/useProjectCategories.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_FILE_BUTTON_BG,
  ADMIN_ACCENT_FILE_BUTTON_HOVER,
} from './adminTheme.js'

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

async function defaultSavePayload(payload, existingProject) {
  return existingProject
    ? apiFetch(`/projects/${existingProject.code}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    : apiFetch('/projects', { method: 'POST', body: JSON.stringify(payload) })
}

async function defaultUploadFile(file) {
  const formData = new FormData()
  formData.append('photos', file)
  const uploaded = await apiFetch('/uploads', {
    method: 'POST',
    body: formData,
  })
  return uploaded.urls[0]
}

export default function AdminProjectForm({
  project,
  onSaved,
  onCancel,
  savePayload = defaultSavePayload,
  uploadFile = defaultUploadFile,
}) {
  const { categories } = useProjectCategories()
  const [title, setTitle] = useState(project?.title ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [techStack, setTechStack] = useState(project?.techStack ?? '')
  const [category, setCategory] = useState(project?.category ?? '')
  const effectiveCategory = category || categories[0] || ''
  const [projectLink, setProjectLink] = useState(project?.projectLink ?? '')
  const [tags, setTags] = useState(project?.tags?.join(', ') ?? '')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(project?.photoUrl ?? null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handlePhotoChange(event) {
    const file = event.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handlePhotoRemove() {
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  async function buildPhotoUrl() {
    if (!photoFile) return photoPreview
    return uploadFile(photoFile)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return
    setError('')
    setSubmitting(true)
    try {
      const photoUrl = await buildPhotoUrl()
      const payload = {
        title,
        description,
        techStack,
        category: effectiveCategory,
        projectLink,
        tags: splitList(tags),
        photoUrl,
      }

      const saved = await savePayload(payload, project)

      onSaved(saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-4 flex flex-col gap-4 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
    >
      {project && (
        <p className="text-sm text-gray-500">
          Code: <span className="font-mono">{project.code}</span> (cannot be
          changed)
        </p>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <textarea
        placeholder="Tech stack"
        value={techStack}
        onChange={(event) => setTechStack(event.target.value)}
        rows={6}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <label className="flex flex-col gap-1 text-sm">
        Category
        <select
          value={effectiveCategory}
          onChange={(event) => setCategory(event.target.value)}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        >
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Project link"
        value={projectLink}
        onChange={(event) => setProjectLink(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(event) => setTags(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />

      <div className="flex flex-col items-start gap-1">
        <span className="text-sm">Photo</span>
        {photoPreview ? (
          <div className="relative h-20 w-28">
            <img
              src={photoPreview}
              alt="Project preview"
              className="h-20 w-28 rounded object-cover"
            />
            <button
              type="button"
              onClick={handlePhotoRemove}
              aria-label="Remove photo"
              className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-600 text-xs leading-none text-white"
            >
              ×
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5 text-xs file:mr-2 file:rounded file:border-0 file:px-2 file:py-1 file:text-white ${ADMIN_ACCENT_FILE_BUTTON_BG} ${ADMIN_ACCENT_FILE_BUTTON_HOVER}`}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white disabled:opacity-50`}
        >
          {submitting ? 'Saving…' : 'Save project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
