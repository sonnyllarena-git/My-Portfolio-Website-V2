import { useState } from 'react'
import StoreCheckoutSteps, { CHECKOUT_STEPS } from './StoreCheckoutSteps.jsx'
import StoreCheckoutPlaceholderStep from './StoreCheckoutPlaceholderStep.jsx'
import StoreCheckoutPaymentStep from './StoreCheckoutPaymentStep.jsx'
import StoreCheckoutPlaceOrderStep from './StoreCheckoutPlaceOrderStep.jsx'
import { STORE_LINK_BLUE, STORE_BODY_TEXT, STORE_PAGE_BG } from './theme.js'

const PLACEHOLDER_DESCRIPTIONS = {
  'shipping-address':
    'Shipping address form coming soon — this step is a placeholder.',
  'shipping-options':
    'Shipping options coming soon — this step is a placeholder.',
  'gift-options': 'Gift options coming soon — this step is a placeholder.',
}

function StoreCheckoutPage({ onExitToCart }) {
  const [step, setStep] = useState(CHECKOUT_STEPS[0].key)
  const stepIndex = CHECKOUT_STEPS.findIndex((s) => s.key === step)
  const currentStep = CHECKOUT_STEPS[stepIndex]

  function goNext() {
    if (stepIndex < CHECKOUT_STEPS.length - 1) {
      setStep(CHECKOUT_STEPS[stepIndex + 1].key)
    }
  }

  function goBack() {
    if (stepIndex === 0) {
      onExitToCart()
    } else {
      setStep(CHECKOUT_STEPS[stepIndex - 1].key)
    }
  }

  return (
    <div className={`shrink-0 flex-1 p-4 ${STORE_PAGE_BG} ${STORE_BODY_TEXT}`}>
      <StoreCheckoutSteps activeStep={step} />

      <div className="mx-auto mt-3 max-w-5xl rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h1 className="text-2xl">{currentStep.heading}</h1>
          {step !== 'place-order' && (
            <button
              type="button"
              onClick={goNext}
              className="cursor-pointer rounded bg-gray-100 px-6 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
            >
              Next
            </button>
          )}
        </div>

        {step === 'payment' ? (
          <StoreCheckoutPaymentStep />
        ) : step === 'place-order' ? (
          <StoreCheckoutPlaceOrderStep />
        ) : (
          <StoreCheckoutPlaceholderStep
            description={PLACEHOLDER_DESCRIPTIONS[step]}
          />
        )}
      </div>

      <button
        type="button"
        onClick={goBack}
        className={`mx-auto mt-3 block max-w-5xl cursor-pointer text-sm ${STORE_LINK_BLUE}`}
      >
        ← Back
      </button>
    </div>
  )
}

export default StoreCheckoutPage
