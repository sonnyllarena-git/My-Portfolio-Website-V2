import { STORE_STAR_COLOR, STORE_SECONDARY_TEXT } from './theme.js'

export const CHECKOUT_STEPS = [
  {
    key: 'shipping-address',
    label: 'Shipping Address',
    heading: 'Shipping Address',
  },
  {
    key: 'shipping-options',
    label: 'Shipping Options',
    heading: 'Shipping Options',
  },
  {
    key: 'payment',
    label: 'Payment Options',
    heading: 'Choose your Payment Option',
  },
  { key: 'gift-options', label: 'Gift Options', heading: 'Gift Options' },
  { key: 'place-order', label: 'Place Order', heading: 'Place Order' },
]

function StoreCheckoutSteps({ activeStep }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 border-b border-gray-200 pb-3 text-sm">
      {CHECKOUT_STEPS.map((step, index) => (
        <span
          key={step.key}
          className={
            step.key === activeStep
              ? `font-bold ${STORE_STAR_COLOR}`
              : STORE_SECONDARY_TEXT
          }
        >
          {String(index + 1).padStart(2, '0')} {step.label}
        </span>
      ))}
    </div>
  )
}

export default StoreCheckoutSteps
