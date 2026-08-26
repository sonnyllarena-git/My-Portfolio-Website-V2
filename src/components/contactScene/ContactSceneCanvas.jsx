import { Canvas } from '@react-three/fiber'
import ContactSceneBackdrop from './ContactSceneBackdrop.jsx'
import AmbientField from './AmbientField.jsx'
import FloatingIcon from './FloatingIcon.jsx'

function ContactSceneCanvas({
  icons,
  activeId,
  onActivate,
  isMinimized = false,
}) {
  return (
    <div className="relative h-full w-full">
      <ContactSceneBackdrop />
      <Canvas
        className="relative"
        dpr={[1, 2]}
        gl={{ alpha: true }}
        frameloop={isMinimized ? 'never' : 'always'}
        camera={{ fov: 48, position: [0, 0, 8] }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={0.8}
          color="#00f0ff"
        />
        <AmbientField />
        {icons.map((icon, index) => (
          <FloatingIcon
            key={icon.id}
            icon={icon}
            index={index}
            isActive={icon.id === activeId}
            onActivate={onActivate}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default ContactSceneCanvas
