const GRAVITY = 2000
const JUMP_VELOCITY = -650
export const PLAYER_SIZE = 32
const OBSTACLE_WIDTH = 24
const OBSTACLE_HEIGHT = 32

export function applyGravity(player, dt, groundY) {
  let velocity = player.velocity + GRAVITY * dt
  let y = player.y + velocity * dt
  const restY = groundY - PLAYER_SIZE
  if (y >= restY) {
    y = restY
    velocity = 0
  }
  return { ...player, y, velocity }
}

export function jump(player, groundY) {
  const restY = groundY - PLAYER_SIZE
  if (player.y < restY) return player
  return { ...player, velocity: JUMP_VELOCITY }
}

export function moveObstacles(obstacles, dt, speed) {
  return obstacles
    .map((obstacle) => ({ ...obstacle, x: obstacle.x - speed * dt }))
    .filter((obstacle) => obstacle.x + obstacle.width > 0)
}

export function spawnObstacle(obstacles, groundY) {
  return [
    ...obstacles,
    {
      x: 420,
      y: groundY - OBSTACLE_HEIGHT,
      width: OBSTACLE_WIDTH,
      height: OBSTACLE_HEIGHT,
    },
  ]
}

export function checkCollision(player, obstacles) {
  const playerBox = {
    left: player.x,
    right: player.x + PLAYER_SIZE,
    top: player.y,
    bottom: player.y + PLAYER_SIZE,
  }
  return obstacles.some((obstacle) => {
    const withinX =
      playerBox.right > obstacle.x &&
      playerBox.left < obstacle.x + obstacle.width
    if (!withinX) return false
    return playerBox.bottom > obstacle.y
  })
}
