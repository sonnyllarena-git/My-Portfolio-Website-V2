// Deterministic per-keycap floating-motion parameters for the Tech Stack
// scene (see src/hooks/useKeycapTargets.js) — a seeded hash instead of
// Math.random() so config stays stable across re-renders instead of
// reshuffling, and so React's purity rule (no impure calls during render)
// is satisfied.
function hash01(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

// World units of drift on each axis, and how fast that drift cycles —
// deliberately slow/gentle so it reads as "weightless" rather than jittery.
const DRIFT_AMPLITUDE_XY_RANGE = [1.2, 2.6]
const DRIFT_AMPLITUDE_Z_RANGE = [0.4, 1.1]
const DRIFT_FREQUENCY_RANGE = [0.05, 0.14] // cycles per second
// Slow continuous tumble, radians/second per axis.
const ROTATION_SPEED_RANGE = [0.06, 0.28]
const Z_DEPTH_RANGE = [0.4, 1.0] // 0.4 = nearest to camera, 1.0 = farthest

export function getKeycapFloatConfig(i) {
  return {
    driftAmpX: lerp(
      DRIFT_AMPLITUDE_XY_RANGE[0],
      DRIFT_AMPLITUDE_XY_RANGE[1],
      hash01(i, 20),
    ),
    driftAmpY: lerp(
      DRIFT_AMPLITUDE_XY_RANGE[0],
      DRIFT_AMPLITUDE_XY_RANGE[1],
      hash01(i, 21),
    ),
    driftAmpZ: lerp(
      DRIFT_AMPLITUDE_Z_RANGE[0],
      DRIFT_AMPLITUDE_Z_RANGE[1],
      hash01(i, 22),
    ),
    driftFreqX: lerp(
      DRIFT_FREQUENCY_RANGE[0],
      DRIFT_FREQUENCY_RANGE[1],
      hash01(i, 23),
    ),
    driftFreqY: lerp(
      DRIFT_FREQUENCY_RANGE[0],
      DRIFT_FREQUENCY_RANGE[1],
      hash01(i, 24),
    ),
    driftFreqZ: lerp(
      DRIFT_FREQUENCY_RANGE[0],
      DRIFT_FREQUENCY_RANGE[1],
      hash01(i, 25),
    ),
    driftPhaseX: hash01(i, 26) * Math.PI * 2,
    driftPhaseY: hash01(i, 27) * Math.PI * 2,
    driftPhaseZ: hash01(i, 28) * Math.PI * 2,
    rotationSpeedX:
      lerp(ROTATION_SPEED_RANGE[0], ROTATION_SPEED_RANGE[1], hash01(i, 29)) *
      (hash01(i, 30) < 0.5 ? -1 : 1),
    rotationSpeedY:
      lerp(ROTATION_SPEED_RANGE[0], ROTATION_SPEED_RANGE[1], hash01(i, 31)) *
      (hash01(i, 32) < 0.5 ? -1 : 1),
    zDepth: lerp(Z_DEPTH_RANGE[0], Z_DEPTH_RANGE[1], hash01(i, 33)),
  }
}
