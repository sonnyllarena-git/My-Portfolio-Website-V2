import { createContext, useContext, useEffect, useState } from 'react'

const StoreCartContext = createContext(null)
const CART_STORAGE_KEY = 'storeCart'

function readStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function lineKey(item) {
  return `${item.productId}__${item.color}__${item.size}`
}

export function StoreCartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(productId, color, size, quantity) {
    const key = lineKey({ productId, color, size })
    setItems((prev) => {
      const existing = prev.find((item) => lineKey(item) === key)
      if (existing) {
        return prev.map((item) =>
          lineKey(item) === key
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { productId, color, size, quantity }]
    })
  }

  function updateQuantity(productId, color, size, quantity) {
    const key = lineKey({ productId, color, size })
    setItems((prev) =>
      prev.map((item) =>
        lineKey(item) === key ? { ...item, quantity } : item,
      ),
    )
  }

  function removeItem(productId, color, size) {
    const key = lineKey({ productId, color, size })
    setItems((prev) => prev.filter((item) => lineKey(item) !== key))
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreCartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, itemCount }}
    >
      {children}
    </StoreCartContext.Provider>
  )
}

export function useStoreCart() {
  const context = useContext(StoreCartContext)
  if (!context) {
    throw new Error('useStoreCart must be used within a StoreCartProvider')
  }
  return context
}
