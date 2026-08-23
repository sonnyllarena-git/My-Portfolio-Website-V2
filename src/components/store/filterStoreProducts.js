export function filterStoreProducts(products, { genders, color, query } = {}) {
  const trimmedQuery = query?.trim().toLowerCase()

  return products
    .filter((product) => !genders?.size || genders.has(product.gender))
    .filter((product) => !color || product.colors.includes(color))
    .filter(
      (product) =>
        !trimmedQuery ||
        product.name.toLowerCase().includes(trimmedQuery) ||
        product.title.toLowerCase().includes(trimmedQuery) ||
        product.description.toLowerCase().includes(trimmedQuery),
    )
    .sort((a, b) => b.rating - a.rating)
}
