import { useState } from 'react'
import { apiFetch } from './api.js'
import {
  ADMIN_CARD_BORDER,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
} from './adminTheme.js'

const DETAIL_SECTIONS = [
  {
    title: 'Top Highlights',
    fields: [{ key: 'careInstructions', label: 'Care instructions' }],
  },
  {
    title: 'Style',
    fields: [
      { key: 'neckStyle', label: 'Neck style' },
      { key: 'styleName', label: 'Style name' },
      { key: 'fitType', label: 'Fit type' },
      { key: 'pattern', label: 'Pattern' },
      { key: 'theme', label: 'Theme' },
      { key: 'seasons', label: 'Seasons' },
      { key: 'sleeveType', label: 'Sleeve type' },
      { key: 'hemlineForm', label: 'Hemline form' },
      { key: 'occasion', label: 'Occasion' },
      { key: 'sweaterForm', label: 'Sweater form' },
    ],
  },
  {
    title: 'Item details',
    fields: [
      { key: 'ageRangeDescription', label: 'Age range description' },
      { key: 'modelName', label: 'Model name' },
      { key: 'itemTypeName', label: 'Item type name' },
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

export default function AdminProductForm({ product, onSaved, onCancel }) {
  const [name, setName] = useState(product?.name ?? '')
  const [title, setTitle] = useState(product?.title ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [gender, setGender] = useState(product?.gender ?? 'Unisex')
  const [price, setPrice] = useState(product?.price ?? '')
  const [colors, setColors] = useState(product?.colors?.join(', ') ?? '')
  const [sizes, setSizes] = useState(product?.sizes?.join(', ') ?? '')
  const [details, setDetails] = useState(() => initialDetails(product))
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState(product?.images ?? [])
  const [error, setError] = useState('')

  function handleDetailChange(key, value) {
    setDetails((prev) => ({ ...prev, [key]: value }))
  }

  function handleFilesChange(event) {
    const selected = Array.from(event.target.files)
    setFiles(selected)
    setPreviews(selected.map((file) => URL.createObjectURL(file)))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      let images = product?.images ?? []
      if (files.length) {
        const formData = new FormData()
        files.forEach((file) => formData.append('photos', file))
        const uploaded = await apiFetch('/uploads', {
          method: 'POST',
          body: formData,
        })
        images = uploaded.urls
      }

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

      const saved = product
        ? await apiFetch(`/products/${product.code}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          })
        : await apiFetch('/products', {
            method: 'POST',
            body: JSON.stringify(payload),
          })

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
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
      />
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="h-16 w-16 rounded object-cover"
            />
          ))}
        </div>
      )}

      {DETAIL_SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">{section.title}</h2>
          {section.fields.map((field) => (
            <input
              key={field.key}
              type="text"
              placeholder={field.label}
              value={details[field.key]}
              onChange={(event) =>
                handleDetailChange(field.key, event.target.value)
              }
              className={`rounded border ${ADMIN_CARD_BORDER} px-3 py-2 text-sm`}
            />
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
