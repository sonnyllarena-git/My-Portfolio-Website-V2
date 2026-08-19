function arrowCursorUrl(hex) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M2 2 L2 20 L7 16 L10 22 L13 20.5 L10 14.5 L17 14.5 Z' fill='${hex}' stroke='white' stroke-width='1.2' stroke-linejoin='round'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 2 2, auto`
}

export function getCursorValue(styleId, accentHex) {
  if (styleId === 'precision') return arrowCursorUrl('#111111')
  if (styleId === 'accent') return arrowCursorUrl(accentHex ?? '#3b82f6')
  return 'auto'
}
