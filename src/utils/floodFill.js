export function floodFill(
  imageData,
  startX,
  startY,
  fillColor,
  tolerance = 32,
) {
  const { width, height, data } = imageData
  const startIndex = (startY * width + startX) * 4
  const startColor = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3],
  ]
  const [r, g, b, a] = fillColor

  if (
    startColor[0] === r &&
    startColor[1] === g &&
    startColor[2] === b &&
    startColor[3] === a
  ) {
    return imageData
  }

  function matchesStartColor(index) {
    return (
      Math.abs(data[index] - startColor[0]) <= tolerance &&
      Math.abs(data[index + 1] - startColor[1]) <= tolerance &&
      Math.abs(data[index + 2] - startColor[2]) <= tolerance &&
      Math.abs(data[index + 3] - startColor[3]) <= tolerance
    )
  }

  const visited = new Uint8Array(width * height)
  const stack = [[startX, startY]]

  while (stack.length > 0) {
    const [x, y] = stack.pop()
    if (x < 0 || x >= width || y < 0 || y >= height) continue

    const pixelIndex = y * width + x
    if (visited[pixelIndex]) continue

    const index = pixelIndex * 4
    if (!matchesStartColor(index)) continue

    visited[pixelIndex] = 1
    data[index] = r
    data[index + 1] = g
    data[index + 2] = b
    data[index + 3] = a

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }

  return imageData
}
