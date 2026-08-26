import { useMemo } from 'react'
import * as THREE from 'three'

const textureCache = new Map()
const TEXTURE_SIZE = 256

function drawGlyphTexture(glyph, label) {
  const canvas = document.createElement('canvas')
  canvas.width = TEXTURE_SIZE
  canvas.height = TEXTURE_SIZE
  const ctx = canvas.getContext('2d')

  const center = TEXTURE_SIZE / 2
  const radius = TEXTURE_SIZE * 0.36

  ctx.fillStyle = '#0d1116'
  ctx.beginPath()
  ctx.arc(center, center, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)'
  ctx.lineWidth = 6
  ctx.stroke()

  ctx.font = `${TEXTURE_SIZE * 0.34}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(glyph, center, center - TEXTURE_SIZE * 0.06)

  ctx.font = `600 ${TEXTURE_SIZE * 0.09}px system-ui, sans-serif`
  ctx.fillStyle = 'rgba(0, 240, 255, 0.9)'
  ctx.fillText(label, center, TEXTURE_SIZE * 0.88)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function useGlyphTexture(icon) {
  return useMemo(() => {
    if (textureCache.has(icon.id)) return textureCache.get(icon.id)
    const texture = drawGlyphTexture(icon.glyph, icon.label)
    textureCache.set(icon.id, texture)
    return texture
  }, [icon.id, icon.glyph, icon.label])
}
