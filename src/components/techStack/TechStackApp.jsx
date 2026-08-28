import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { TECH_STACK_KEYCAPS } from '../../data/techStackKeycaps'
import KeyCap, { KeycapHoverContext } from './KeyCap'
import TechStackMobileGrid from './TechStackMobileGrid'
import { useKeycapTargets } from '../../hooks/useKeycapTargets'

// --- Particle text: samples a name into dot positions on an offscreen canvas,
// cached per string since the same names repeat across hovers. ---
function sampleTextParticles(text, fontSize = 20, stride = 1) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const font = `900 ${fontSize}px Verdana, Arial, sans-serif`
  ctx.font = font
  ctx.letterSpacing = '1.5px'
  const width = Math.max(1, Math.ceil(ctx.measureText(text).width) + 12)
  const height = Math.ceil(fontSize * 1.6)
  canvas.width = width
  canvas.height = height
  ctx.font = font
  ctx.letterSpacing = '1.5px'
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 6, height / 2)

  const { data } = ctx.getImageData(0, 0, width, height)
  const points = []
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        points.push({ x: x - width / 2, y: y - height / 2 })
      }
    }
  }
  return points
}

const textParticleCache = new Map()
function getTextParticles(text) {
  if (!textParticleCache.has(text)) {
    textParticleCache.set(text, sampleTextParticles(text))
  }
  return textParticleCache.get(text)
}

const SCATTER_START_MS = 150
const ASSEMBLE_START_MS = 500
const ASSEMBLE_END_MS = 1200
const LEAVE_MS = 500

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

// Draws the currently-hovered keycap's name assembling from/scattering into
// dots, driven entirely off a mutable ref (hoverRef) so it never triggers a
// React re-render — KeyCap writes to it every frame while hovered.
function ParticleTextCanvas({ hoverRef }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const lastKeyRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      const parent = canvas.parentElement
      dpr = window.devicePixelRatio || 1
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = `${parent.clientWidth}px`
      canvas.style.height = `${parent.clientHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      const hover = hoverRef.current
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      ctx.clearRect(0, 0, width, height)

      if (!hover.phase) return

      const now = performance.now()
      const transitionKey = `${hover.id}-${hover.phase}-${hover.phaseStart}`
      if (lastKeyRef.current !== transitionKey) {
        lastKeyRef.current = transitionKey
        if (hover.phase === 'in') {
          particlesRef.current = getTextParticles(hover.text).map((t) => {
            const angle = Math.random() * Math.PI * 2
            const radius = 4 + Math.random() * 10
            return {
              fromX: Math.cos(angle) * radius,
              fromY: Math.sin(angle) * radius,
              toX: t.x,
              toY: t.y,
            }
          })
        } else if (hover.phase === 'out') {
          particlesRef.current = particlesRef.current.map((p) => {
            const angle = Math.random() * Math.PI * 2
            const radius = 20 + Math.random() * 30
            return {
              fromX: p.toX,
              fromY: p.toY,
              toX: p.toX + Math.cos(angle) * radius,
              toY: p.toY + Math.sin(angle) * radius,
            }
          })
        }
      }

      const elapsed = now - hover.phaseStart
      let progress = 1
      let alpha = 1

      if (hover.phase === 'in') {
        if (elapsed < SCATTER_START_MS) {
          alpha = 0
          progress = 0
        } else if (elapsed < ASSEMBLE_START_MS) {
          alpha =
            (elapsed - SCATTER_START_MS) /
            (ASSEMBLE_START_MS - SCATTER_START_MS)
          progress = 0
        } else if (elapsed < ASSEMBLE_END_MS) {
          alpha = 1
          progress = easeOutCubic(
            (elapsed - ASSEMBLE_START_MS) /
              (ASSEMBLE_END_MS - ASSEMBLE_START_MS),
          )
        }
      } else if (hover.phase === 'out') {
        const leaveProgress = Math.min(elapsed / LEAVE_MS, 1)
        progress = easeOutCubic(leaveProgress)
        alpha = 1 - leaveProgress
        if (leaveProgress >= 1) {
          hover.phase = null
          particlesRef.current = []
          lastKeyRef.current = null
        }
      }

      if (alpha <= 0 || !particlesRef.current.length) return

      const anchorX = hover.x
      const anchorY = hover.y - 48

      ctx.save()
      ctx.shadowColor = 'rgba(140, 235, 255, 0.85)'
      ctx.shadowBlur = 4
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      particlesRef.current.forEach((p) => {
        const x = anchorX + p.fromX + (p.toX - p.fromX) * progress
        const y = anchorY + p.fromY + (p.toY - p.fromY) * progress
        ctx.beginPath()
        ctx.arc(x, y, 1.15, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [hoverRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-50"
    />
  )
}

// Renders every keycap into one scene — a single shared depth buffer is what
// actually gives "some in front, some a little further back": three.js sorts
// and occludes by real Z position on its own, no split-canvas trick needed.
// It also means every keycap is equally hoverable/draggable, not just
// whichever subset used to land in the interactive layer.
function KeycapField({ count }) {
  const targets = useKeycapTargets(count)

  return TECH_STACK_KEYCAPS.map((item, index) => (
    <KeyCap key={item.name} item={item} target={targets[index]} />
  ))
}

// The Tech Stack app: every listed technology floats as a physical keycap,
// drifting and slowly tumbling forever with no gravity (see
// useKeycapTargets' getKeycapFloatPosition) — draggable, with a hover
// name-reveal particle effect (see ParticleTextCanvas above). Skipped on
// mobile and when the visitor prefers reduced motion, in favor of
// TechStackMobileGrid.
function TechStackApp({ isMinimized = false }) {
  const [skip] = useState(
    () =>
      window.innerWidth < 768 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const hoverRef = useRef({
    id: null,
    text: '',
    x: 0,
    y: 0,
    phase: null,
    phaseStart: 0,
  })

  if (skip) return <TechStackMobileGrid />

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#14151a]">
      <KeycapHoverContext.Provider value={hoverRef}>
        <Canvas
          camera={{ position: [0, 0, 16], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={isMinimized ? 'never' : 'always'}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 15, 10]} intensity={2.5} />
          <pointLight
            position={[-10, -10, -10]}
            color="#FF4D4D"
            intensity={0.5}
          />
          <pointLight position={[10, 10, 10]} color="#ffffff" intensity={0.3} />

          <KeycapField count={TECH_STACK_KEYCAPS.length} />
        </Canvas>

        <ParticleTextCanvas hoverRef={hoverRef} />
      </KeycapHoverContext.Provider>
    </div>
  )
}

export default TechStackApp
