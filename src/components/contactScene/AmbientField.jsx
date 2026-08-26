import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function AmbientField() {
  const icoRef = useRef(null)
  const torusRef = useRef(null)

  useFrame((_, delta) => {
    if (icoRef.current) icoRef.current.rotation.y += delta * 0.05
    if (torusRef.current) torusRef.current.rotation.x -= delta * 0.04
  })

  return (
    <group>
      <mesh ref={icoRef} position={[-3, 1.5, -7]}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh ref={torusRef} position={[3, -1.5, -9]}>
        <torusGeometry args={[2.5, 0.6, 8, 32]} />
        <meshBasicMaterial
          color="#00ff66"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

export default AmbientField
