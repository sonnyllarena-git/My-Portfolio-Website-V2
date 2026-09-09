import { useState } from 'react'
import { accentColors } from '../data/accentColors.js'
import { useAdminSettings } from './AdminSettingsContext.jsx'
import { apiFetch } from './api.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
} from './adminTheme.js'

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setSubmitting(true)
    try {
      await apiFetch('/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      setSuccess('Password updated.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message || 'Failed to change password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex max-w-sm flex-col gap-3 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
    >
      <input
        type="password"
        placeholder="Current password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        autoComplete="current-password"
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        autoComplete="new-password"
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        autoComplete="new-password"
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <button
        type="submit"
        disabled={submitting}
        className={`self-start rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white disabled:opacity-50`}
      >
        {submitting ? 'Saving…' : 'Change password'}
      </button>
    </form>
  )
}

export default function AdminSettingsPage() {
  const { accentColorId, setAccentColorId } = useAdminSettings()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Settings</h1>
      <div>
        <h2 className="mb-2 text-sm font-semibold">Accent color</h2>
        <div className="flex gap-2">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColorId(color.id)}
              aria-label={color.id}
              style={{ backgroundColor: color.hex }}
              className={`h-8 w-8 rounded-full border-2 ${
                accentColorId === color.id
                  ? 'border-gray-900'
                  : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-sm font-semibold">Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  )
}
