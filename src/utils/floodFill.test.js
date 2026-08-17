import { describe, it, expect } from 'vitest'
import { floodFill } from './floodFill.js'

function makeImageData(width, height, color = [255, 255, 255, 255]) {
  const data = new Uint8ClampedArray(width * height * 4)
  for (let i = 0; i < data.length; i += 4) {
    data[i] = color[0]
    data[i + 1] = color[1]
    data[i + 2] = color[2]
    data[i + 3] = color[3]
  }
  return { width, height, data }
}

describe('floodFill', () => {
  it('fills the matching region with the new color', () => {
    const imageData = makeImageData(4, 4)
    floodFill(imageData, 0, 0, [255, 0, 0, 255])
    expect(imageData.data.slice(0, 4)).toEqual(
      Uint8ClampedArray.from([255, 0, 0, 255]),
    )
    // opposite corner, part of the same uniform region, also fills
    const lastPixel = (4 * 4 - 1) * 4
    expect(imageData.data.slice(lastPixel, lastPixel + 4)).toEqual(
      Uint8ClampedArray.from([255, 0, 0, 255]),
    )
  })

  it('is a no-op when the target color already matches the fill color', () => {
    const imageData = makeImageData(4, 4, [10, 20, 30, 255])
    const before = Uint8ClampedArray.from(imageData.data)
    floodFill(imageData, 0, 0, [10, 20, 30, 255])
    expect(imageData.data).toEqual(before)
  })
})
