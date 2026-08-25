// Cell size is fixed to DesktopIcon.jsx's Large preset (w-28 container, h-12 glyph, text-sm
// label) plus room for a 2-line label, so changing View -> icon size never repositions icons.
const ORIGIN_X = 16
const ORIGIN_Y = 16
const TASKBAR_HEIGHT = 48
const ICON_BOX_WIDTH = 112
const ICON_BOX_HEIGHT = 105
const CELL_GAP = 8
export const CELL_WIDTH = ICON_BOX_WIDTH + CELL_GAP
export const CELL_HEIGHT = ICON_BOX_HEIGHT + CELL_GAP

export function cellToPixel(row, col) {
  return { x: ORIGIN_X + col * CELL_WIDTH, y: ORIGIN_Y + row * CELL_HEIGHT }
}

export function pixelToNearestCell(x, y) {
  return {
    row: Math.max(0, Math.round((y - ORIGIN_Y) / CELL_HEIGHT)),
    col: Math.max(0, Math.round((x - ORIGIN_X) / CELL_WIDTH)),
  }
}

export function computeAutoLayout(icons, viewportHeight) {
  const usableHeight = viewportHeight - ORIGIN_Y - TASKBAR_HEIGHT
  const rowsPerColumn = Math.max(1, Math.floor(usableHeight / CELL_HEIGHT))
  const positions = {}
  icons.forEach((icon, index) => {
    positions[icon.id] = {
      row: index % rowsPerColumn,
      col: Math.floor(index / rowsPerColumn),
    }
  })
  return positions
}
