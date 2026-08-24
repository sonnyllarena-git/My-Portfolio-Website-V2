import { useEffect, useState } from 'react'
import { apiFetch } from './api.js'
import AdminProductForm from './AdminProductForm.jsx'
import {
  ADMIN_CARD_BORDER,
  ADMIN_SECONDARY_TEXT,
  ADMIN_ACCENT_BG,
  ADMIN_ACCENT_HOVER_BG,
  ADMIN_ACCENT_TEXT,
} from './adminTheme.js'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    apiFetch('/products')
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  function handleSaved(product) {
    setProducts((prev) =>
      prev.some((p) => p.code === product.code)
        ? prev.map((p) => (p.code === product.code ? product : p))
        : [...prev, product],
    )
    setShowForm(false)
    setEditingProduct(null)
  }

  function handleAddClick() {
    setEditingProduct(null)
    setShowForm(true)
  }

  function handleEditClick(product) {
    setEditingProduct(product)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingProduct(null)
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete ${product.name}?`)) return
    await apiFetch(`/products/${product.code}`, { method: 'DELETE' })
    setProducts((prev) => prev.filter((p) => p.code !== product.code))
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Products</h1>
        <button
          onClick={handleAddClick}
          className={`rounded ${ADMIN_ACCENT_BG} ${ADMIN_ACCENT_HOVER_BG} px-3 py-2 text-sm font-medium text-white`}
        >
          Add product
        </button>
      </div>
      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      )}
      <div
        className={`overflow-hidden rounded-lg border ${ADMIN_CARD_BORDER} bg-white`}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className={`border-b ${ADMIN_CARD_BORDER} ${ADMIN_SECONDARY_TEXT}`}
            >
              <th className="px-4 py-2 font-medium">Code</th>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Price</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && products.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className={`px-4 py-6 text-center ${ADMIN_SECONDARY_TEXT}`}
                >
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr
                key={product.code}
                className={`border-b last:border-0 ${ADMIN_CARD_BORDER}`}
              >
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="flex gap-3 px-4 py-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className={ADMIN_ACCENT_TEXT}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
