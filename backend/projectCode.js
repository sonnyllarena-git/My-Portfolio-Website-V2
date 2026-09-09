export function generateProjectCode(id) {
  return `PROJ-${String(id).padStart(4, '0')}`
}
