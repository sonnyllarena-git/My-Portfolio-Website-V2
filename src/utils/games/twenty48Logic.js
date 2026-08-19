const SIZE = 4

export function createEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
}

export function spawnTile(grid) {
  const emptyCells = []
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (grid[row][col] === 0) emptyCells.push([row, col])
    }
  }
  if (emptyCells.length === 0) return grid

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  const next = grid.map((r) => [...r])
  next[row][col] = Math.random() < 0.9 ? 2 : 4
  return next
}

export function slideAndMergeRow(row) {
  const values = row.filter((value) => value !== 0)
  let scoreDelta = 0

  for (let i = 0; i < values.length - 1; i += 1) {
    if (values[i] !== 0 && values[i] === values[i + 1]) {
      values[i] *= 2
      scoreDelta += values[i]
      values[i + 1] = 0
    }
  }

  const merged = values.filter((value) => value !== 0)
  while (merged.length < row.length) merged.push(0)
  return { row: merged, scoreDelta }
}

function transpose(grid) {
  return grid[0].map((_, col) => grid.map((row) => row[col]))
}

function reverseRows(grid) {
  return grid.map((row) => [...row].reverse())
}

export function move(grid, direction) {
  const needsTranspose = direction === 'up' || direction === 'down'
  const needsReverse = direction === 'right' || direction === 'down'

  let working = grid
  if (needsTranspose) working = transpose(working)
  if (needsReverse) working = reverseRows(working)

  let scoreDelta = 0
  let result = working.map((row) => {
    const slid = slideAndMergeRow(row)
    scoreDelta += slid.scoreDelta
    return slid.row
  })

  if (needsReverse) result = reverseRows(result)
  if (needsTranspose) result = transpose(result)

  const moved = JSON.stringify(result) !== JSON.stringify(grid)
  return { grid: result, scoreDelta, moved }
}

export function isGameOver(grid) {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      if (grid[row][col] === 0) return false
      if (col < SIZE - 1 && grid[row][col] === grid[row][col + 1]) return false
      if (row < SIZE - 1 && grid[row][col] === grid[row + 1][col]) return false
    }
  }
  return true
}
