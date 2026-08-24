import { STORE_LINK_BLUE } from './theme.js'

const INPUT_CLASS =
  'rounded border border-gray-400 px-2 py-1.5 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300'

const CARD_NETWORKS = [
  'VISA',
  'Mastercard',
  'Amex',
  'Discover',
  'JCB',
  'UnionPay',
]

function StoreCheckoutPaymentStep() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-3 font-semibold">Credit or Debit Card</h2>

        <label
          htmlFor="checkout-card-name"
          className="mb-1 block text-sm font-semibold"
        >
          Name on card
        </label>
        <input
          id="checkout-card-name"
          type="text"
          placeholder="Ex: John Mccan"
          className={`w-full ${INPUT_CLASS}`}
        />

        <label
          htmlFor="checkout-card-number"
          className="mb-1 mt-3 block text-sm font-semibold"
        >
          Card Number
        </label>
        <input
          id="checkout-card-number"
          type="text"
          placeholder="XXXX - XXXX - XXXX - XXXX"
          className={`w-full ${INPUT_CLASS}`}
        />

        <div className="mt-3 flex gap-4">
          <div className="w-24">
            <label
              htmlFor="checkout-card-cvv"
              className="mb-1 block text-sm font-semibold"
            >
              Security Code
            </label>
            <input
              id="checkout-card-cvv"
              type="text"
              placeholder="123"
              className={`w-full ${INPUT_CLASS}`}
            />
          </div>
          <div>
            <span className="mb-1 block text-sm font-semibold">
              Expiration date
            </span>
            <div className="flex gap-2">
              <select className={`w-16 ${INPUT_CLASS}`}>
                {Array.from({ length: 12 }, (_, i) =>
                  String(i + 1).padStart(2, '0'),
                ).map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <select className={`w-20 ${INPUT_CLASS}`}>
                {Array.from({ length: 10 }, (_, i) => 2026 + i).map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:border-l md:border-gray-200 md:pl-8">
        <h2 className="mb-3 font-semibold">
          Gift Cards &amp; Promotional Codes
        </h2>
        <button
          type="button"
          className={`cursor-pointer self-start text-sm underline ${STORE_LINK_BLUE}`}
        >
          Enter a gift card or promotional code
        </button>

        <h2 className="mb-3 mt-8 font-semibold">Add a Bank Account</h2>

        <div className="mt-auto pt-8">
          <p className="text-xs text-gray-600">
            Sonny&apos;s Store accepts all major credit and debit cards
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CARD_NETWORKS.map((network) => (
              <span
                key={network}
                className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] font-bold text-gray-500"
              >
                {network}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreCheckoutPaymentStep
