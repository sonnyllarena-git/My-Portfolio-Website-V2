import { useState } from 'react'
import loginBackground from '../assets/login ui/gmail login ui.png'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GmailGuestGate({ onSubmit, onCancel }) {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')

  const emailFilled = email.trim().length > 0
  const nameFilled = name.trim().length > 0
  const canContinue = step === 'email' ? emailFilled : nameFilled

  function handleEmailSubmit(e) {
    e.preventDefault()
    if (!emailFilled) return
    if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError('Enter a valid email address.')
      return
    }
    setEmailError('')
    setStep('name')
  }

  function handleNameSubmit(e) {
    e.preventDefault()
    if (!nameFilled) return
    onSubmit({ name: name.trim(), email: email.trim() })
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <form
        onSubmit={step === 'email' ? handleEmailSubmit : handleNameSubmit}
        noValidate
        className="relative w-full max-w-[340px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${loginBackground})`,
          aspectRatio: '500 / 889',
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute left-[80%] top-[19%] h-[7%] w-[14%] cursor-pointer rounded-full hover:bg-black/5"
        />

        {step === 'email' ? (
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            placeholder="Enter your email"
            aria-label="Enter your email"
            className={`absolute left-[32.4%] top-[56%] h-[5%] w-[42.4%] rounded-sm border bg-white px-2 text-gray-800 outline-none [font-size:clamp(8px,2.4vw,12px)] ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            aria-label="Enter your name"
            className="absolute left-[32.4%] top-[56%] h-[5%] w-[42.4%] rounded-sm border border-gray-300 bg-white px-2 text-gray-800 outline-none [font-size:clamp(8px,2.4vw,12px)]"
          />
        )}

        <button
          type="submit"
          disabled={!canContinue}
          aria-label={step === 'email' ? 'Next' : 'Login'}
          className={`absolute left-[32%] top-[60.5%] h-[4.6%] w-[43.2%] rounded-sm text-center font-medium [font-size:clamp(8px,2.2vw,12px)] ${
            step === 'name'
              ? canContinue
                ? 'bg-[#4386f4] text-white'
                : 'bg-gray-300 text-gray-400'
              : !emailFilled
                ? 'bg-white/50'
                : ''
          }`}
        >
          {step === 'name' ? 'Login' : ''}
        </button>

        {emailError && (
          <p className="absolute left-[32%] top-[66%] w-[43.2%] text-center text-xs text-red-300 [font-size:clamp(7px,2vw,10px)]">
            {emailError}
          </p>
        )}
      </form>
    </div>
  )
}

export default GmailGuestGate
