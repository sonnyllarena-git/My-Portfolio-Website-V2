import { useState } from 'react'
import {
  STORE_GOLD_CTA_BG,
  STORE_GOLD_CTA_HOVER_BG,
  STORE_LINK_BLUE,
} from './theme.js'

function StoreSignInPage({ onSignIn = () => {}, onSignUp = () => {} }) {
  const [name, setName] = useState('')

  return (
    <div className="flex flex-1 flex-col items-center bg-white px-4 py-10 text-black">
      <div className="mt-6 w-full max-w-sm rounded border border-gray-300 p-6">
        <h1 className="mb-3 text-2xl">Sign in</h1>

        <label
          htmlFor="signin-name"
          className="mb-1 block text-sm font-semibold"
        >
          Enter name
        </label>
        <input
          id="signin-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border border-gray-400 px-2 py-1.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
        />

        <button
          type="button"
          disabled={!name.trim()}
          onClick={() => onSignIn(name.trim())}
          className={`mt-4 w-full cursor-pointer rounded py-1.5 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${STORE_GOLD_CTA_BG} ${STORE_GOLD_CTA_HOVER_BG}`}
        >
          Continue
        </button>

        <p className="mt-3 text-xs text-gray-600">
          By continuing, you agree to Sonny&apos;s Store&apos;s Conditions of
          Use and Privacy Notice.
        </p>

        <p className={`mt-2 text-xs ${STORE_LINK_BLUE}`}>Need help?</p>

        <hr className="my-4 border-gray-200" />

        <p className="text-xs font-semibold">New customer?</p>
        <button
          type="button"
          onClick={onSignUp}
          className={`mt-1 cursor-pointer text-sm ${STORE_LINK_BLUE}`}
        >
          Start here.
        </button>
      </div>

      <div className="mt-8 flex gap-4 text-xs text-gray-500">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>
    </div>
  )
}

export default StoreSignInPage
