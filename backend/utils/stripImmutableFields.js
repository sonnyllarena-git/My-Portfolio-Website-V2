export function stripImmutableFields(body) {
  const rest = { ...body }
  delete rest.code
  delete rest.id
  return rest
}
