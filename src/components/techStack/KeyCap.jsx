import { useRef, useState, useContext, createContext, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Text, Decal } from '@react-three/drei'
import { Vector3, Plane } from 'three'
import { useIconTexture } from '../../hooks/useIconTexture'
import { getKeycapFloatPosition } from '../../hooks/useKeycapTargets'

// Shared with TechStackApp's particle-text canvas: a mutable ref (not React
// state) so 60fps hover-position updates skip React's render cycle.
export const KeycapHoverContext = createContext(null)

// ~400ms-to-settle exponential decay: exp(-DRAG_DECAY_RATE * 0.4) ≈ 0.05, i.e.
// the drag offset is ~95% gone 400ms after release.
const DRAG_DECAY_RATE = 7.5

const KeyCap = ({ item, target }) => {
  const groupRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const texture = useIconTexture(item.icon)
  const hoverRef = useContext(KeycapHoverContext)
  const { camera, size, raycaster, clock } = useThree()
  // Reused across the whole drag so we're not allocating every pointermove.
  const dragPlaneRef = useRef(new Plane(new Vector3(0, 0, 1), 0))
  const dragPointRef = useRef(new Vector3())
  // How far the keycap has been dragged from its live floating position —
  // added on top of that position every frame, decaying to zero on release
  // instead of a physics velocity carrying it back.
  const dragOffsetRef = useRef(new Vector3())

  const handlePointerDown = (e) => {
    e.stopPropagation()
    e.target.setPointerCapture(e.pointerId)
    // R3F's pointer-capture events only recompute a hit point while the ray
    // still directly intersects this (small, moving) mesh — the instant it
    // doesn't, the event replays a frozen point from the original grab, which
    // is why dragging used to nudge once then stop tracking the cursor.
    // Dragging on our own fixed depth-plane sidesteps that entirely.
    const pos = groupRef.current?.position
    const z = pos && Number.isFinite(pos.z) ? pos.z : 0
    dragPlaneRef.current.set(new Vector3(0, 0, 1), -z)
    setIsDragging(true)
  }

  const handlePointerUp = (e) => {
    e.stopPropagation()
    e.target.releasePointerCapture(e.pointerId)
    setIsDragging(false)
  }

  const handlePointerMove = () => {
    if (!isDragging || !target) return
    const hit = raycaster.ray.intersectPlane(
      dragPlaneRef.current,
      dragPointRef.current,
    )
    if (!hit || !Number.isFinite(hit.x) || !Number.isFinite(hit.y)) return
    const float = getKeycapFloatPosition(target, clock.elapsedTime)
    dragOffsetRef.current.set(
      hit.x - float.position.x,
      hit.y - float.position.y,
      0,
    )
  }

  const handlePointerEnter = () => {
    setHovered(true)
    if (hoverRef) {
      hoverRef.current.id = item.name
      hoverRef.current.text = item.name
      hoverRef.current.phase = 'in'
      hoverRef.current.phaseStart = performance.now()
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    if (hoverRef && hoverRef.current.id === item.name) {
      hoverRef.current.phase = 'out'
      hoverRef.current.phaseStart = performance.now()
    }
  }

  useFrame(() => {
    if (!hovered || !hoverRef || !groupRef.current) return
    const pos = groupRef.current.position
    const vector = new Vector3(pos.x, pos.y + 0.55, pos.z)
    vector.project(camera)
    hoverRef.current.x = (vector.x * 0.5 + 0.5) * size.width
    hoverRef.current.y = (-(vector.y * 0.5) + 0.5) * size.height
  })

  // The keycap drifts forever around its base position (see
  // useKeycapTargets' getKeycapFloatPosition) — dragging adds a temporary
  // offset on top of that live position rather than overriding it, and the
  // offset decays back to zero once released so the keycap re-syncs to
  // wherever its drift has moved to by then, not back to where it was
  // grabbed.
  useFrame((state, delta) => {
    if (!groupRef.current || !target) return
    const float = getKeycapFloatPosition(target, state.clock.elapsedTime)

    if (!isDragging) {
      dragOffsetRef.current.multiplyScalar(Math.exp(-DRAG_DECAY_RATE * delta))
    }

    groupRef.current.position.set(
      float.position.x + dragOffsetRef.current.x,
      float.position.y + dragOffsetRef.current.y,
      float.position.z,
    )
    groupRef.current.rotation.set(
      float.rotation[0],
      float.rotation[1],
      float.rotation[2],
    )
    groupRef.current.scale.setScalar(target.scale ?? 1)
  })

  const textColor = item.color === '#FF6B00' ? '#FFFFFF' : '#FF6B00'

  return (
    <group ref={groupRef}>
      <group
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <RoundedBox args={[0.85, 0.65, 0.85]} radius={0.12} smoothness={6}>
          <meshPhysicalMaterial
            color={item.color}
            emissive={hovered ? '#ffffff' : '#000000'}
            emissiveIntensity={hovered ? 0.1 : 0}
            roughness={hovered ? 0.08 : 0.15}
            metalness={0.1}
            clearcoat={hovered ? 1.15 : 1.0}
            clearcoatRoughness={hovered ? 0.05 : 0.1}
          />

          {texture && (
            <Decal
              position={[0, 0.33, -0.06]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[0.38, 0.38, 0.38]}
            >
              <meshBasicMaterial
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
                transparent
                alphaTest={0.1}
              />
            </Decal>
          )}
        </RoundedBox>

        {/* Local Suspense so a slow first-time font fetch (troika-three-text)
            only delays this label, not the whole scene — the R3F Canvas
            wraps its children in one Suspense by default, so without this
            boundary every keycap's mesh stays invisible until the font
            resolves. */}
        <Suspense fallback={null}>
          <Text
            position={[0, 0.34, 0.22]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.1}
            color={textColor}
            anchorX="center"
            anchorY="middle"
            maxWidth={0.75}
          >
            {item.name}
          </Text>
        </Suspense>

        {hovered && (
          <pointLight
            position={[0, 1.2, 0]}
            color="#ffffff"
            intensity={1.2}
            distance={1.6}
          />
        )}
      </group>
    </group>
  )
}

export default KeyCap
