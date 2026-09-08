import { useEffect, useRef, useState } from 'react'
import { apiFetch } from './api.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_TEXT,
} from './adminTheme.js'

function formatTimestamp(iso) {
  return new Date(iso).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDuration(seconds) {
  const total = Math.round(seconds ?? 0)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

const EMPTY_FORM = { type: 'video', title: '', artist: '', album: '' }

export default function AdminMusicLabPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [mediaFile, setMediaFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [duration, setDuration] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const mediaProbeRef = useRef(null)

  useEffect(() => {
    apiFetch('/music-lab')
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  function handleMediaChange(e) {
    const file = e.target.files?.[0] ?? null
    setMediaFile(file)
    setDuration(0)
    if (!file) return
    const url = URL.createObjectURL(file)
    const probe = mediaProbeRef.current
    if (probe) {
      probe.src = url
      probe.onloadedmetadata = () => {
        setDuration(probe.duration || 0)
        URL.revokeObjectURL(url)
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) return setError('Title is required')
    if (!editingId && !mediaFile) return setError('A media file is required')

    setSubmitting(true)
    try {
      if (editingId) {
        const updated = await apiFetch(`/music-lab/${editingId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: form.title.trim(),
            artist: form.artist.trim(),
            album: form.album.trim(),
          }),
        })
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
      } else {
        const body = new FormData()
        body.append('type', form.type)
        body.append('title', form.title.trim())
        body.append('artist', form.artist.trim())
        body.append('album', form.album.trim())
        body.append('duration', String(Math.round(duration)))
        body.append('media', mediaFile)
        if (thumbnailFile) body.append('thumbnail', thumbnailFile)

        const created = await apiFetch('/music-lab', { method: 'POST', body })
        setItems((prev) => [created, ...prev])
      }
      handleCancelEdit()
      e.target.reset()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  function handleEditClick(item) {
    setEditingId(item.id)
    setForm({
      type: item.type,
      title: item.title,
      artist: item.artist ?? '',
      album: item.album ?? '',
    })
    setError('')
  }

  function handleCancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setMediaFile(null)
    setThumbnailFile(null)
    setDuration(0)
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return
    await apiFetch(`/music-lab/${item.id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Music Lab</h1>
        <span className={`text-sm ${ADMIN_SECONDARY_TEXT}`}>
          {items.length} item{items.length === 1 ? '' : 's'}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`mb-6 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
      >
        <audio ref={mediaProbeRef} className="hidden" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Type
            <select
              value={form.type}
              disabled={!!editingId}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5 disabled:opacity-50`}
            >
              <option value="video">Video</option>
              <option value="track">Music</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Title
            <input
              type="text"
              value={form.title}
              maxLength={80}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5`}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Artist
            <input
              type="text"
              value={form.artist}
              maxLength={80}
              onChange={(e) => setForm({ ...form, artist: e.target.value })}
              className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5`}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Album
            <input
              type="text"
              value={form.album}
              maxLength={80}
              onChange={(e) => setForm({ ...form, album: e.target.value })}
              className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5`}
            />
          </label>
          {!editingId && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                Media file ({form.type === 'video' ? 'video' : 'audio'})
                <input
                  type="file"
                  accept={form.type === 'video' ? 'video/*' : 'audio/*'}
                  onChange={handleMediaChange}
                  className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5 text-xs file:mr-2 file:rounded ${ADMIN_ACCENT_BG} file:border-0 file:px-2 file:py-1 file:text-white ${ADMIN_ACCENT_HOVER_BG}`}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm sm:col-span-2">
                Thumbnail (optional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setThumbnailFile(e.target.files?.[0] ?? null)
                  }
                  className={`rounded border ${ADMIN_CARD_BORDER} px-2 py-1.5 text-xs file:mr-2 file:rounded ${ADMIN_ACCENT_BG} file:border-0 file:px-2 file:py-1 file:text-white ${ADMIN_ACCENT_HOVER_BG}`}
                />
              </label>
            </>
          )}
        </div>
        {editingId && (
          <p className={`mt-2 text-xs ${ADMIN_SECONDARY_TEXT}`}>
            Editing details only — delete and re-upload to replace the file.
          </p>
        )}
        {duration > 0 && (
          <p className={`mt-2 text-xs ${ADMIN_SECONDARY_TEXT}`}>
            Detected duration: {formatDuration(duration)}
          </p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className={`rounded px-4 py-2 text-sm font-medium text-white ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} disabled:opacity-50`}
          >
            {submitting
              ? editingId
                ? 'Saving…'
                : 'Uploading…'
              : editingId
                ? 'Save changes'
                : 'Upload'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className={`rounded border px-4 py-2 text-sm font-medium ${ADMIN_CARD_BORDER}`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div
        className={`overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
            >
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Artist</th>
              <th className="px-4 py-2 font-medium">Album</th>
              <th className="px-4 py-2 font-medium">Duration</th>
              <th className="px-4 py-2 font-medium">Uploaded</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No items yet.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr
                key={item.id}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2 capitalize">{item.type}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.artist}</td>
                <td className="px-4 py-2">{item.album}</td>
                <td className="px-4 py-2">{formatDuration(item.duration)}</td>
                <td className="px-4 py-2">{formatTimestamp(item.createdAt)}</td>
                <td className="flex gap-3 px-4 py-2">
                  <button
                    onClick={() => handleEditClick(item)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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
