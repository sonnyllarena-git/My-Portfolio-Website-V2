export { stripImmutableFields } from './utils/stripImmutableFields.js'

export function generateProductCode(id) {
  return `PRD-${String(id).padStart(4, '0')}`
}
