import { useEffect, useState } from 'react'
import * as THREE from 'three'

// Rasterizes an icon URL onto a fixed-size canvas before handing it to three.js.
// Devicon SVGs have inconsistent intrinsic sizes, which caused corrupt/blank
// GPU texture uploads when passed straight through THREE.TextureLoader.
// Ported verbatim from the Website Portfolio project.
const textureCache = new Map()

export function useIconTexture(url) {
  // Only the async-load outcome lives in state — a cache hit is read
  // directly at render time below, never via a synchronous setState call
  // inside the effect (this repo's lint enforces the React Compiler's
  // effects-must-not-set-state-synchronously rule).
  const [loaded, setLoaded] = useState(null)

  useEffect(() => {
    if (textureCache.has(url)) return undefined

    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      canvas.getContext('2d').drawImage(img, 0, 0, 128, 128)

      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      textureCache.set(url, tex)
      setLoaded({ url, texture: tex })
    }
    img.src = url

    return () => {
      cancelled = true
    }
  }, [url])

  return textureCache.get(url) ?? (loaded?.url === url ? loaded.texture : null)
}
