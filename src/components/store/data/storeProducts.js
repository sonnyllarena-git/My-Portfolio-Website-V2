import vibeCoderFront from '../product/VIBE CODER/Vibe Coder Front.png'

// rating/reviewCount/boughtCount/deliveryEstimate are placeholder display dressing (the mockup
// needs them, Sonny's product spec doesn't provide real ones yet) — swap for real numbers later.
export const storeProducts = [
  {
    id: 'vibe-coder',
    name: 'VIBE CODER',
    title: 'Vibe Coder Unisex Heavyweight Fleece Pullover Hoodie',
    description:
      'This unisex heavyweight fleece pullover hoodie features a modern streetwear style with a relaxed fit and dropped shoulders, designed with a bold white "VIBE CODER" block typography centered across the chest while keeping the back and sleeves completely plain for a clean, minimalist aesthetic.',
    gender: 'Unisex',
    colors: ['Charcoal Grey', 'Navy Blue', 'Black', 'White', 'Heather Grey'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    material: 'Cotton',
    sleeveType: 'Long Sleeve',
    style: 'Hoodie',
    image: vibeCoderFront,
    badge: 'Best Seller',
    subline: 'Top Rated Streetwear Pick',
    rating: 4.5,
    reviewCount: '171.2K',
    boughtCount: '4K+ bought in past month',
    deliveryEstimate: 'Delivery Sep 1 - 14 to Philippines',
  },
]

export const STORE_GRID_SIZE = 4
