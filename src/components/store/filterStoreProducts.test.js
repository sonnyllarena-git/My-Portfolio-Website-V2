import { describe, it, expect } from 'vitest'
import { filterStoreProducts } from './filterStoreProducts.js'

const products = [
  {
    name: 'Vibe Coder',
    title: 'Vibe Coder Hoodie',
    description: 'A cozy pullover hoodie',
    gender: 'Unisex',
    colors: ['Black', 'Navy Blue'],
    rating: 4.5,
  },
  {
    name: 'Comfy Cap',
    title: 'Comfy Cap',
    description: 'A relaxed baseball cap',
    gender: 'Men',
    colors: ['Navy Blue', 'White'],
    rating: 4.8,
  },
]

describe('filterStoreProducts', () => {
  it('filters by gender + color and sorts remaining matches by rating desc', () => {
    const result = filterStoreProducts(products, {
      genders: new Set(['Unisex', 'Men']),
      color: 'Navy Blue',
      query: '',
    })
    expect(result.map((p) => p.name)).toEqual(['Comfy Cap', 'Vibe Coder'])
  })

  it('returns an empty array when the search query matches nothing', () => {
    const result = filterStoreProducts(products, {
      genders: new Set(),
      color: null,
      query: 'nonexistent product',
    })
    expect(result).toEqual([])
  })
})
