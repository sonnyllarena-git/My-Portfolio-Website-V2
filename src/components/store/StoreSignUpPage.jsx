import { useState } from 'react'
import logo from './assets/components/sonny store logo.png'
import {
  STORE_HEADER_BG,
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
  STORE_LINK_BLUE,
} from './theme.js'

function StoreSignUpPage({ onSignUp = () => {}, onSignIn = () => {} }) {
  const [name, setName] = useState('')

  return (
    <div
      className={`flex flex-1 flex-col items-center px-4 py-10 text-white ${STORE_HEADER_BG}`}
    >
      <img src={logo} alt="Sonny" className="h-10" />

      <div className="mt-6 w-full max-w-sm rounded border border-white/20 bg-white p-6 text-black">
        <h1 className="mb-3 text-2xl">Create account</h1>

        <label
          htmlFor="signup-name"
          className="mb-1 block text-sm font-semibold"
        >
          Enter name to create account
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-400 px-2 py-1.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
        />

        <button
          type="button"
          disabled={!name.trim()}
          onClick={() => onSignUp(name.trim())}
          className={`mt-4 w-full cursor-pointer rounded py-1.5 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
        >
          Continue
        </button>

        <p className="mt-3 text-xs text-gray-600">
          By creating an account, you agree to Sonny&apos;s Store&apos;s
          Conditions of Use and Privacy Notice.
        </p>

        <hr className="my-4 border-gray-200" />

        <p className="text-xs font-semibold">Already have an account?</p>
        <button
          type="button"
          onClick={onSignIn}
          className={`mt-1 cursor-pointer text-sm underline ${STORE_LINK_BLUE}`}
        >
          Sign in.
        </button>
      </div>

      <div className="mt-8 flex gap-4 text-xs text-white/70">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>
    </div>
  )
}

export default StoreSignUpPage
