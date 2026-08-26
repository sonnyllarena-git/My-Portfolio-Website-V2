import { useEffect, useState } from 'react'
import sIcon from '../assets/icons/S icon.png'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GmailGuestGate({ onSubmit, onCancel }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  const value = step === 'email' ? email : name

  function handleChange(e) {
    if (step === 'email') setEmail(e.target.value)
    else setName(e.target.value)
    if (error) setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError(
        step === 'email' ? 'Enter an email address.' : 'Enter your name.',
      )
      return
    }
    if (step === 'email' && !EMAIL_PATTERN.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }
    if (step === 'email') {
      setError('')
      setStep('name')
      return
    }
    onSubmit({ name: trimmed, email: email.trim() })
  }

  return (
    <div className="@container flex h-full w-full flex-col overflow-auto bg-[#eef1f5] text-[#202124]">
      <div className="flex h-8 shrink-0 items-center gap-2 bg-[#202124] px-3 text-[11px] text-gray-300">
        <span aria-hidden="true">🔒</span>
        <span>accounts.google.com/v3/signin</span>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 @lg:p-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl @lg:p-12"
        >
          <div className="flex flex-col gap-8 @lg:flex-row @lg:items-center @lg:gap-12">
            <div className="@lg:w-2/5">
              <img src={sIcon} alt="" className="h-10 w-10" />
              <h1 className="mt-4 text-3xl font-normal text-gray-800">
                Sign in
              </h1>
              <p className="mt-3 text-sm text-gray-700">
                Let Sonny know who is reaching out to him.
              </p>
              <p className="mt-1 text-sm text-[#1a73e8]">
                This will not login your real gmail account
              </p>
            </div>

            <div className="@lg:w-3/5">
              <div className="relative">
                <label
                  htmlFor="gmail-gate-input"
                  className="absolute -top-2 left-3 z-10 bg-white px-1 text-xs font-medium text-[#1a73e8]"
                >
                  {step === 'email' ? 'Email' : 'Name'}
                </label>
                <input
                  id="gmail-gate-input"
                  key={step}
                  autoFocus
                  type={step === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={handleChange}
                  style={{ caretColor: '#1a73e8' }}
                  className="w-full rounded border-2 border-[#1a73e8] px-4 py-3.5 text-base text-gray-800 outline-none"
                />
              </div>
              {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}

              <p className="mt-8 text-xs text-gray-600">
                Not your computer? Use Guest mode to sign in privately.{' '}
                <span className="text-[#1a73e8]">
                  Learn more about using Guest mode
                </span>
              </p>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md"
                >
                  {step === 'email' ? 'Next' : 'Sign in'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-6 py-3 text-xs text-gray-600">
        <span>English (United Kingdom)</span>
        <div className="flex gap-6">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
      <p className="shrink-0 px-6 pb-4 text-center text-[11px] text-gray-500">
        © 2026 Sonny. All rights reserved. For commercial partnerships,
        technical consultations, or business inquiries, contact Sonny.
      </p>
    </div>
  )
}

export default GmailGuestGate
