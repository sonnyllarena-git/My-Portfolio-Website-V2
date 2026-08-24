import { describe, expect, it } from 'vitest'
import { mapCatalogProductToStoreProduct } from './mapCatalogProduct.js'

describe('mapCatalogProductToStoreProduct', () => {
  it('maps a fully-populated catalog row to the Store product shape', () => {
    const row = {
      code: 'PRD-0001',
      name: 'Vibe Coder',
      title: 'Vibe Coder Hoodie',
      description: 'A hoodie',
      gender: 'Unisex',
      material: 'Cotton',
      sleeveType: 'Long Sleeve',
      style: 'Hoodie',
      price: 1750,
      colors: ['Black', 'White'],
      sizes: ['M', 'L'],
      images: ['/uploads/a.png', '/uploads/b.png'],
      careInstructions: 'Machine Wash',
      neckStyle: 'Hooded Neck',
      styleName: 'Hoodie',
      fitType: 'Regular',
      pattern: 'Solid',
      theme: 'Sport',
      seasons: 'Fall',
      hemlineForm: 'Ribbed',
      occasion: 'Daily Wear',
      sweaterForm: 'Pullover',
      ageRangeDescription: 'Adult',
      modelName: 'Model 1',
      itemTypeName: 'Hoodie',
      published: true,
    }

    expect(mapCatalogProductToStoreProduct(row)).toEqual({
      id: 'PRD-0001',
      name: 'Vibe Coder',
      title: 'Vibe Coder Hoodie',
      description: 'A hoodie',
      gender: 'Unisex',
      material: 'Cotton',
      sleeveType: 'Long Sleeve',
      style: 'Hoodie',
      price: 1750,
      colors: ['Black', 'White'],
      sizes: ['M', 'L'],
      images: ['/uploads/a.png', '/uploads/b.png'],
      image: '/uploads/a.png',
      careInstructions: 'Machine Wash',
      neckStyle: 'Hooded Neck',
      styleName: 'Hoodie',
      fitType: 'Regular',
      pattern: 'Solid',
      theme: 'Sport',
      seasons: 'Fall',
      hemlineForm: 'Ribbed',
      occasion: 'Daily Wear',
      sweaterForm: 'Pullover',
      ageRangeDescription: 'Adult',
      modelName: 'Model 1',
      itemTypeName: 'Hoodie',
    })
  })

  it('fills in safe defaults when colors/sizes/images/price are missing', () => {
    const row = { code: 'PRD-0002', name: 'Draft Product' }

    const mapped = mapCatalogProductToStoreProduct(row)

    expect(mapped.colors).toEqual([])
    expect(mapped.sizes).toEqual([])
    expect(mapped.images).toEqual([])
    expect(mapped.image).toBeNull()
    expect(mapped.price).toBe(0)
    expect(mapped.rating).toBeUndefined()
  })
})
