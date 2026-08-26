import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Decal } from '@react-three/drei'
import { useGlyphTexture } from '../../hooks/useGlyphTexture.js'
import { projectToScreen } from '../../utils/projectToScreen.js'

function FloatingIcon({ icon, index, isActive, onActivate }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const texture = useGlyphTexture(icon)
  const { camera, size, gl } = useThree()

  const phase = index * 0.9
  const floatSpeed = 0.6 + (index % 3) * 0.15
  const spinSpeed = (0.15 + (index % 4) * 0.05) * (index % 2 === 0 ? 1 : -1)
  const floatAmplitude = 0.2

  useFrame((state, delta) => {
    if (!groupRef.current || isActive) return
    const { viewport, clock } = state
    const t = clock.elapsedTime
    const baseX = (icon.nx * viewport.width) / 2
    const baseY = (icon.ny * viewport.height) / 2
    const floatY = Math.sin(t * floatSpeed + phase) * floatAmplitude
    const swayX = Math.cos(t * floatSpeed * 0.6 + phase) * 0.05

    groupRef.current.position.set(baseX + swayX, baseY + floatY, icon.nz)
    groupRef.current.rotation.y += delta * spinSpeed
    groupRef.current.rotation.x = Math.sin(t * 0.5 + phase) * 0.05
  })

  return (
    <group
      ref={groupRef}
      visible={!isActive}
      onClick={(e) => {
        e.stopPropagation()
        const canvasRect = gl.domElement.getBoundingClientRect()
        const anchor = projectToScreen(
          groupRef.current,
          camera,
          size,
          canvasRect,
        )
        onActivate(icon.id, anchor)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <RoundedBox args={[1.1, 1.1, 0.12]} radius={0.18} smoothness={4}>
        <meshStandardMaterial
          color="#0d1116"
          metalness={0.2}
          roughness={0.5}
          emissive="#00f0ff"
          emissiveIntensity={hovered ? 0.35 : 0.15}
        />
        <Decal
          position={[0, 0, 0.061]}
          rotation={[0, 0, 0]}
          scale={1}
          map={texture}
        />
      </RoundedBox>
    </group>
  )
}

export default FloatingIcon
