export function generateProductCode(id) {
  return `PRD-${String(id).padStart(4, '0')}`
}

export function stripImmutableFields(body) {
  const rest = { ...body }
  delete rest.code
  delete rest.id
  return rest
}
