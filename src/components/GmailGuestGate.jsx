import { useEffect, useState } from 'react'
import emailLoginBg from './gmail/assets/gmail email login.jpg'
import nameLoginBg from './gmail/assets/gmail name login.jpg'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GmailGuestGate({ onSubmit, onCancel }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)

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
    <div className="flex h-full w-full items-center justify-center bg-[#1a1c22] p-2">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative w-full bg-cover bg-center bg-no-repeat shadow-2xl"
        style={{
          backgroundImage: `url(${step === 'email' ? emailLoginBg : nameLoginBg})`,
          aspectRatio: '1920 / 1056',
          containerType: 'inline-size',
        }}
      >
        <input
          key={step}
          autoFocus
          type={step === 'email' ? 'email' : 'text'}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label={step === 'email' ? 'Email' : 'Name'}
          style={{ caretColor: '#1a73e8' }}
          className="absolute top-[39.87%] left-[51.93%] h-[6.06%] w-[25.21%] bg-transparent text-gray-800 outline-none [font-size:max(9px,1.78cqw)]"
        />
        {!focused && value.length === 0 && (
          <span
            aria-hidden="true"
            className="terminal-cursor pointer-events-none absolute top-[41.5%] left-[52.3%] h-[3.2%] w-px bg-[#1a73e8]"
          />
        )}

        <button
          type="submit"
          aria-label={step === 'email' ? 'Next' : 'Sign in'}
          className="absolute top-[61.46%] left-[72.92%] h-[3.88%] w-[4.22%] cursor-pointer rounded-full"
        />

        {error && (
          <p className="absolute top-[47%] left-[51.93%] w-[25.21%] text-red-600 [font-size:max(8px,1.33cqw)]">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}

export default GmailGuestGate
