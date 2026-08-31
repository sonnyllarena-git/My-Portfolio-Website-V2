import { createContext, useContext, useEffect, useState } from 'react'
import { mapCatalogProductToStoreProduct } from '../utils/mapCatalogProduct.js'

const StoreCatalogContext = createContext(null)

export function StoreCatalogProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products?published=true')
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        return response.json()
      })
      .then((rows) => setProducts(rows.map(mapCatalogProductToStoreProduct)))
      .catch((err) => {
        console.error('Failed to load products:', err)
        setError('Could not load products right now.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <StoreCatalogContext.Provider value={{ products, loading, error }}>
      {children}
    </StoreCatalogContext.Provider>
  )
}

export function useStoreCatalog() {
  const context = useContext(StoreCatalogContext)
  if (!context) {
    throw new Error(
      'useStoreCatalog must be used within a StoreCatalogProvider',
    )
  }
  return context
}
