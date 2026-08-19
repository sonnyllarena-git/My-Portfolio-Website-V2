const GRAVITY = 1400
const JUMP_VELOCITY = -420
const BIRD_RADIUS = 14
export const PIPE_WIDTH = 60

export function applyGravity(bird, dt) {
  const velocity = bird.velocity + GRAVITY * dt
  return { ...bird, velocity, y: bird.y + velocity * dt }
}

export function jump(bird) {
  return { ...bird, velocity: JUMP_VELOCITY }
}

export function movePipes(pipes, dt, speed) {
  return pipes
    .map((pipe) => ({ ...pipe, x: pipe.x - speed * dt }))
    .filter((pipe) => pipe.x + PIPE_WIDTH > 0)
}

export function spawnPipe(pipes, canvasHeight, gapSize) {
  const margin = 60
  const gapCenter =
    margin + Math.random() * (canvasHeight - margin * 2 - gapSize) + gapSize / 2
  return [...pipes, { x: 400, gapCenter, gapSize, passed: false }]
}

export function checkCollision(bird, pipes, canvasHeight) {
  if (bird.y - BIRD_RADIUS < 0 || bird.y + BIRD_RADIUS > canvasHeight) {
    return true
  }
  return pipes.some((pipe) => {
    const withinPipeX =
      bird.x + BIRD_RADIUS > pipe.x &&
      bird.x - BIRD_RADIUS < pipe.x + PIPE_WIDTH
    if (!withinPipeX) return false
    const gapTop = pipe.gapCenter - pipe.gapSize / 2
    const gapBottom = pipe.gapCenter + pipe.gapSize / 2
    return bird.y - BIRD_RADIUS < gapTop || bird.y + BIRD_RADIUS > gapBottom
  })
}
