import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { pixelToWorldOnPlane } from '../utils/ndcToWorldOnPlane'
import { getKeycapFloatConfig } from '../data/keycapFloatConfig'

// Deterministic pseudo-random in [0,1) — a keycap's base position stays
// stable across recomputes (Math.random() would reshuffle it every render).
function hash01(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp01(t) {
  return Math.max(0, Math.min(1, t))
}

// Breathing room from the Canvas's literal edge, in pixels, so no keycap's
// resting spot sits flush against the window's border.
const EDGE_MARGIN_PX = 40
const NEAR_WORLD_Z = 3 // zDepth 0.4 (closest) maps here
const FAR_WORLD_Z = -4 // zDepth 1.0 (farthest) maps here
const NEAR_SCALE = 1.3
const FAR_SCALE = 0.7

// One static descriptor per keycap — a random base X/Y (via
// pixelToWorldOnPlane, so it's grounded in the Canvas's real visible area)
// plus this keycap's floating-motion config (drift amplitude/frequency/
// phase per axis, tumble speed, depth — see keycapFloatConfig.js). Only
// recomputed when the viewport/count changes, not per frame:
// getKeycapFloatPosition() combines this with the live elapsed time every
// frame instead (see KeyCap.jsx), which is why the motion never triggers a
// React render.
export function useKeycapTargets(count) {
  const { camera, size } = useThree()

  return useMemo(() => {
    const left = EDGE_MARGIN_PX
    const right = size.width - EDGE_MARGIN_PX
    const top = EDGE_MARGIN_PX
    const bottom = size.height - EDGE_MARGIN_PX

    const descriptors = []
    for (let i = 0; i < count; i++) {
      const config = getKeycapFloatConfig(i)
      const px = lerp(left, right, hash01(i, 1))
      const py = lerp(top, bottom, hash01(i, 2))
      const base =
        pixelToWorldOnPlane(px, py, size.width, size.height, camera, 0) ??
        new Vector3()
      const depthT = clamp01((config.zDepth - 0.4) / 0.6)

      descriptors.push({
        baseX: base.x,
        baseY: base.y,
        baseZ: lerp(NEAR_WORLD_Z, FAR_WORLD_Z, depthT),
        scale: lerp(NEAR_SCALE, FAR_SCALE, depthT),
        baseRotation: [
          hash01(i, 9) * Math.PI,
          hash01(i, 10) * Math.PI,
          hash01(i, 11) * Math.PI,
        ],
        config,
      })
    }
    return descriptors
  }, [camera, size, count])
}

// Pure function (not a hook) — called every frame from KeyCap.jsx's own
// useFrame with the live elapsed time (state.clock.elapsedTime), so it never
// triggers a React render. There's no "settle" or "progress" here: the
// keycap drifts around its base position forever, on two layered sine waves
// per axis (a fast, small one on top of a slow, large one) so the motion
// reads as organic wandering rather than an obvious metronome.
export function getKeycapFloatPosition(descriptor, t) {
  const { config } = descriptor

  const driftAxis = (base, amp, freq, phase) => {
    const slow = Math.sin(t * freq * Math.PI * 2 + phase) * amp
    const fast =
      Math.sin(t * freq * Math.PI * 2 * 2.3 + phase * 1.7 + 1) * amp * 0.35
    return base + slow + fast
  }

  const x = driftAxis(
    descriptor.baseX,
    config.driftAmpX,
    config.driftFreqX,
    config.driftPhaseX,
  )
  const y = driftAxis(
    descriptor.baseY,
    config.driftAmpY,
    config.driftFreqY,
    config.driftPhaseY,
  )
  const z = driftAxis(
    descriptor.baseZ,
    config.driftAmpZ,
    config.driftFreqZ,
    config.driftPhaseZ,
  )

  const rotation = [
    descriptor.baseRotation[0] + t * config.rotationSpeedX,
    descriptor.baseRotation[1] + t * config.rotationSpeedY,
    descriptor.baseRotation[2],
  ]

  return { position: new Vector3(x, y, z), rotation }
}
