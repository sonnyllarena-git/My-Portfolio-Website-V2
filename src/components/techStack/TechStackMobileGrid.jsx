import { TECH_STACK_KEYCAPS } from '../../data/techStackKeycaps'

// Static fallback for the falling-keycaps 3D scene: used on mobile, when the
// visitor prefers reduced motion, and as the taskbar hover-preview body (a
// cheap thumbnail that doesn't need to spin up a second WebGL canvas).
function TechStackMobileGrid() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-3 overflow-auto bg-[#14151a] p-4 sm:grid-cols-4">
      {TECH_STACK_KEYCAPS.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-center"
        >
          <img src={item.icon} alt="" className="h-8 w-8 object-contain" />
          <span className="text-xs text-white/80">{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default TechStackMobileGrid
