export function generateTemplateCode(id) {
  return `TPL-${String(id).padStart(4, '0')}`
}
