const PASSTHROUGH_FIELDS = [
  'name',
  'title',
  'description',
  'gender',
  'material',
  'sleeveType',
  'style',
  'careInstructions',
  'neckStyle',
  'styleName',
  'fitType',
  'pattern',
  'theme',
  'seasons',
  'hemlineForm',
  'occasion',
  'sweaterForm',
  'ageRangeDescription',
  'modelName',
  'itemTypeName',
]

// Converts an admin catalog DB row into the shape the Store components expect. rating/
// reviewCount/boughtCount/badge/deliveryEstimate are intentionally left undefined — there's no
// real data source for them, and the Store components already render safely without them.
export function mapCatalogProductToStoreProduct(row) {
  const mapped = { id: row.code }
  for (const field of PASSTHROUGH_FIELDS) mapped[field] = row[field]
  mapped.price = row.price ?? 0
  mapped.colors = row.colors ?? []
  mapped.sizes = row.sizes ?? []
  mapped.images = row.images ?? []
  mapped.image = mapped.images[0] ?? null
  return mapped
}
