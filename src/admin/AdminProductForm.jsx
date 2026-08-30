import { useState } from 'react'
import { apiFetch } from './api.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_SECONDARY_TEXT,
} from './adminTheme.js'

const PHOTO_SLOTS = [
  { key: 'main', label: 'Main image' },
  { key: 'back', label: 'Back view' },
  { key: 'side', label: 'Side view' },
]

// There's no stored signal for which existing image was "the back view" — position is the
// only honest mapping, and it's the same convention this form now enforces going forward.
function initPhotoSlots(product) {
  const images = product?.images ?? []
  return PHOTO_SLOTS.map((_, index) => ({
    file: null,
    preview: images[index] ?? null,
  }))
}

const DETAIL_SECTIONS = [
  {
    title: 'Top Highlights',
    fields: [
      {
        key: 'careInstructions',
        label: 'Care instructions',
        options: [
          'Machine Wash Cold, Tumble Dry Low',
          'Machine Wash Cold, Do Not Bleach, Tumble Dry Low, Do Not Iron',
          'Machine Wash Warm, Tumble Dry Low, Do Not Bleach',
          'Hand Wash Only, Lay Flat to Dry',
          'Hand Wash Cold, Do Not Bleach, Dry Flat, Do Not Iron',
          'Hand Wash Cold, Line Dry',
          'Dry Clean Only',
          'Machine Washable, Do Not Tumble Dry',
          'Spot Clean Only',
        ],
      },
    ],
  },
  {
    title: 'Style',
    fields: [
      {
        key: 'neckStyle',
        label: 'Neck style',
        options: [
          'Crew Neck',
          'V-Neck',
          'Mock Neck',
          'Turtleneck',
          'Scoop Neck',
          'Boat Neck',
          'Cowl Neck',
          'Henley Neck',
          'High Neck',
          'Hooded Neck',
          'Jewel Neck',
          'Keyhole Neck',
          'Off-Shoulder',
          'One-Shoulder',
          'Plunging Neck',
          'Square Neck',
          'Surplice Neck',
          'Sweetheart Neck',
          'Tie Neck',
          'Choker Neck',
          'Collared Neck',
        ],
      },
      {
        key: 'styleName',
        label: 'Style name',
        options: [
          'Baseball',
          'Blouse',
          'Boat Neck',
          'Bolero',
          'Bodysuit',
          'Button Down',
          'Camisole',
          'Cardigan',
          'Corset',
          'Cowl Neck',
          'Crew',
          'Crop',
          'Dashiki',
          'Duster',
          'Graphic Tee',
          'Halter',
          'Hawaiian',
          'Henley',
          'Hoodie',
          'Off The Shoulder',
          'Peplum',
          'Peter Pan Collar',
          'Polo Neck',
          'Polo Shirt',
          'Rugby',
          'Scoop Neck',
          'Shirt',
          'Shrug',
          'Sleeveless',
          'Sweater',
          'Tube',
          'Tunic',
          'Turtleneck',
          'V Neck',
          'Waistcoat',
        ],
      },
      {
        key: 'fitType',
        label: 'Fit type',
        options: [
          'Slim',
          'Regular',
          'Relaxed',
          'Athletic',
          'Oversized',
          'Loose',
          'Fitted',
          'Boxy',
          'Flowy',
          'Skinny',
          'Snug',
          'Straight',
        ],
      },
      {
        key: 'pattern',
        label: 'Pattern',
        options: [
          'Solid',
          'Striped',
          'Floral',
          'Plaid',
          'Animal Print',
          'Argyle',
          'Camouflage',
          'Checkered',
          'Chevron',
          'Geometric',
          'Herringbone',
          'Houndstooth',
          'Paisley',
          'Polka Dot',
          'Colorblock',
          'Heathered',
          'Cable Knit',
          'Graphic Print',
        ],
      },
      {
        key: 'theme',
        label: 'Theme',
        options: [
          'Solid/Basic',
          'Holiday',
          'Christmas',
          'Halloween',
          'Graphic',
          'Novelty',
          'Nautical',
          'Fair Isle',
          'Western',
          'Varsity',
          'Floral',
        ],
      },
      {
        key: 'seasons',
        label: 'Seasons',
        options: [
          'Spring',
          'Summer',
          'Fall',
          'Winter',
          'All Season',
          'Spring/Summer',
          'Fall/Winter',
          'Holiday',
        ],
      },
      {
        key: 'sleeveType',
        label: 'Sleeve type',
        options: [
          'Sleeveless',
          'Short Sleeve',
          '3/4 Sleeve',
          'Long Sleeve',
          'Cap Sleeve',
          'Raglan Sleeve',
          'Bell Sleeve',
          'Balloon Sleeve',
          'Batwing Sleeve',
          'Bishop Sleeve',
          'Butterfly Sleeve',
          'Cold-Shoulder',
          'Puff Sleeve',
          'Kimono Sleeve',
          'Lantern Sleeve',
        ],
      },
      {
        key: 'hemlineForm',
        label: 'Hemline form',
        options: [
          'Straight Hem',
          'Curved Hem',
          'High-Low Hem',
          'Asymmetrical Hem',
          'Ribbed Hem',
          'Side-Slit Hem',
          'Drawstring Hem',
          'Rounded Hem',
        ],
      },
      {
        key: 'occasion',
        label: 'Occasion',
        options: [
          'Casual',
          'Business Casual',
          'Formal',
          'Party',
          'Cocktail',
          'Evening',
          'Wedding',
          'Holiday',
          'Everyday',
          'Vacation',
          'Outdoor',
          'Loungewear',
        ],
      },
      {
        key: 'sweaterForm',
        label: 'Sweater form',
        options: [
          'Pullover',
          'Cardigan',
          'Sweater Vest',
          'Turtleneck Sweater',
          'Shrug',
          'Poncho',
          'Wrap Sweater',
          'Cape',
        ],
      },
    ],
  },
  {
    title: 'Item details',
    fields: [
      {
        key: 'ageRangeDescription',
        label: 'Age range description',
        options: [
          'Adult',
          'Teen',
          'Big Kid',
          'Little Kid',
          'Toddler',
          'Infant',
        ],
      },
      { key: 'modelName', label: 'Model name' },
      {
        key: 'itemTypeName',
        label: 'Item type name',
        options: [
          'Sweater',
          'Cardigan',
          'Pullover',
          'Hoodie',
          'T-Shirt',
          'Turtleneck',
          'Vest',
          'Jacket',
          'Coat',
          'Tunic',
        ],
      },
    ],
  },
]

function splitList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function initialDetails(product) {
  const details = {}
  for (const section of DETAIL_SECTIONS) {
    for (const field of section.fields) {
      details[field.key] = product?.[field.key] ?? ''
    }
  }
  return details
}

async function defaultSavePayload(payload, existingProduct) {
  return existingProduct
    ? apiFetch(`/products/${existingProduct.code}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    : apiFetch('/products', { method: 'POST', body: JSON.stringify(payload) })
}

async function defaultUploadFiles(files) {
  const formData = new FormData()
  files.forEach((file) => formData.append('photos', file))
  const uploaded = await apiFetch('/uploads', {
    method: 'POST',
    body: formData,
  })
  return uploaded.urls
}

export default function AdminProductForm({
  product,
  onSaved,
  onCancel,
  savePayload = defaultSavePayload,
  uploadFiles = defaultUploadFiles,
}) {
  const [name, setName] = useState(product?.name ?? '')
  const [title, setTitle] = useState(product?.title ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [gender, setGender] = useState(product?.gender ?? 'Unisex')
  const [price, setPrice] = useState(product?.price ?? '')
  const [colors, setColors] = useState(product?.colors?.join(', ') ?? '')
  const [sizes, setSizes] = useState(product?.sizes?.join(', ') ?? '')
  const [details, setDetails] = useState(() => initialDetails(product))
  const [photoSlots, setPhotoSlots] = useState(() => initPhotoSlots(product))
  const [error, setError] = useState('')

  function handleDetailChange(key, value) {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  function handleSlotFileChange(index, event) {
    const file = event.target.files[0]
    if (!file) return
    setPhotoSlots((prev) =>
      prev.map((slot, i) =>
        i === index ? { file, preview: URL.createObjectURL(file) } : slot,
      ),
    )
  }

  function handleSlotRemove(index) {
    setPhotoSlots((prev) =>
      prev.map((slot, i) =>
        i === index ? { file: null, preview: null } : slot,
      ),
    )
  }

  async function buildImages() {
    const slotsToUpload = photoSlots.filter((slot) => slot.file)
    let uploadedUrls = []
    if (slotsToUpload.length) {
      uploadedUrls = await uploadFiles(slotsToUpload.map((slot) => slot.file))
    }
    let uploadIndex = 0
    return photoSlots
      .map((slot) => (slot.file ? uploadedUrls[uploadIndex++] : slot.preview))
      .filter(Boolean)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      const images = await buildImages()

      const payload = {
        name,
        title,
        description,
        gender,
        price: Number(price) || 0,
        colors: splitList(colors),
        sizes: splitList(sizes),
        images,
        ...details,
      }

      const saved = await savePayload(payload, product)

      onSaved(saved)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-4 flex flex-col gap-4 rounded-lg border ${ADMIN_CARD_BORDER} bg-white p-4`}
    >
      {product && (
        <p className="text-sm text-gray-500">
          Code: <span className="font-mono">{product.code}</span> (cannot be
          changed)
        </p>
      )}

      <h2 className="text-sm font-semibold">Basic info</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <select
        value={gender}
        onChange={(event) => setGender(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      >
        <option>Unisex</option>
        <option>Men</option>
        <option>Women</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />

      <h2 className="text-sm font-semibold">Variants</h2>
      <input
        type="text"
        placeholder="Colors (comma-separated)"
        value={colors}
        onChange={(event) => setColors(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />
      <input
        type="text"
        placeholder="Sizes (comma-separated)"
        value={sizes}
        onChange={(event) => setSizes(event.target.value)}
        className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
      />

      <h2 className="text-sm font-semibold">Photos</h2>
      <div className="flex gap-6">
        {PHOTO_SLOTS.map((slotDef, index) => {
          const slot = photoSlots[index]
          return (
            <div key={slotDef.key} className="flex flex-col items-center gap-1">
              <span className={`text-xs ${ADMIN_SECONDARY_TEXT}`}>
                {slotDef.label}
              </span>
              {slot.preview ? (
                <div className="relative h-20 w-20">
                  <img
                    src={slot.preview}
                    alt={slotDef.label}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleSlotRemove(index)}
                    aria-label={`Remove ${slotDef.label}`}
                    className="absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-600 text-xs leading-none text-white"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label
                  className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-2 border-dashed text-2xl ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
                >
                  +
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleSlotFileChange(index, event)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )
        })}
      </div>

      {DETAIL_SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">{section.title}</h2>
          {section.fields.map((field) => (
            <div key={field.key}>
              <input
                type="text"
                list={field.options ? `${field.key}-options` : undefined}
                placeholder={field.label}
                value={details[field.key]}
                onChange={(event) =>
                  handleDetailChange(field.key, event.target.value)
                }
                className={`w-full rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
              />
              {field.options && (
                <datalist id={`${field.key}-options`}>
                  {field.options.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              )}
            </div>
          ))}
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Save product
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
