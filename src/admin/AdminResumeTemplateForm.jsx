import { useState } from 'react'
import { apiFetch } from './api.js'
import { RESUME_TEMPLATES } from '../components/resumeGenerator/templates/index.js'
import { accentColors } from '../data/accentColors.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
} from './adminTheme.js'

async function defaultSavePayload(payload, existingTemplate) {
  return existingTemplate
    ? apiFetch(`/resume-templates/${existingTemplate.code}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    : apiFetch('/resume-templates', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
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

export default function AdminResumeTemplateForm({
  template,
  onSaved,
  onCancel,
  savePayload = defaultSavePayload,
  uploadFile = defaultUploadFile,
}) {
  const [name, setName] = useState(template?.name ?? '')
  const [description, setDescription] = useState(template?.description ?? '')
  const [templateKey, setTemplateKey] = useState(
    template?.templateKey ?? Object.keys(RESUME_TEMPLATES)[0] ?? '',
  )
  const [accentHex, setAccentHex] = useState(
    template?.accentHex ?? accentColors[0].hex,
  )
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(
    template?.thumbnailUrl ?? null,
  )
  const [error, setError] = useState('')

  function handleThumbnailChange(event) {
    const file = event.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }

  async function buildThumbnailUrl() {
    if (!thumbnailFile) return thumbnailPreview
    return uploadFile(thumbnailFile)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      const thumbnailUrl = await buildThumbnailUrl()
      const payload = {
        name,
        description,
        templateKey,
        accentHex,
        thumbnailUrl,
      }

      const saved = await savePayload(payload, template)

      onSaved(saved)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-4 flex flex-col gap-4 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
    >
      {template && (
        <p className="text-sm text-gray-500">
          Code: <span className="font-mono">{template.code}</span> (cannot be
          changed)
        </p>
      )}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <label className="flex flex-col gap-1 text-sm">
        Coded template
        <select
          value={templateKey}
          onChange={(event) => setTemplateKey(event.target.value)}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        >
          {Object.entries(RESUME_TEMPLATES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Accent color
        <select
          value={accentHex}
          onChange={(event) => setAccentHex(event.target.value)}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        >
          {accentColors.map((color) => (
            <option key={color.id} value={color.hex}>
              {color.id}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col items-start gap-1">
        <span className="text-sm">Thumbnail</span>
        {thumbnailPreview ? (
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="h-20 w-20 rounded object-cover"
          />
        ) : null}
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Save template
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
