import { useEffect, useRef } from 'react'
import {
  applyGravity,
  jump,
  moveObstacles,
  spawnObstacle,
  checkCollision,
  PLAYER_SIZE,
} from '../../../utils/games/runnerPhysics.js'

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 300
const GROUND_Y = 260
const BASE_SPEED = 200
const SPEED_RAMP_PER_SECOND = 6
const OBSTACLE_SPAWN_INTERVAL = 1.4

function draw(ctx, player, obstacles, score) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.fillStyle = '#0d0d0d'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  ctx.strokeStyle = '#3f3f46'
  ctx.beginPath()
  ctx.moveTo(0, GROUND_Y)
  ctx.lineTo(CANVAS_WIDTH, GROUND_Y)
  ctx.stroke()

  ctx.fillStyle = '#f97316'
  for (const obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
  }

  ctx.font = `${PLAYER_SIZE}px serif`
  ctx.fillText('🏃', player.x, player.y + PLAYER_SIZE)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(String(score), CANVAS_WIDTH - 60, 32)
}

export default function RunnerCanvas({ onGameOver }) {
  const canvasRef = useRef(null)
  const playerRef = useRef({ x: 60, y: GROUND_Y - PLAYER_SIZE, velocity: 0 })
  const obstaclesRef = useRef([])
  const spawnTimerRef = useRef(0)
  const elapsedRef = useRef(0)
  const distanceRef = useRef(0)
  const isRunningRef = useRef(true)
  const onGameOverRef = useRef(onGameOver)

  useEffect(() => {
    onGameOverRef.current = onGameOver
  }, [onGameOver])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    let frameId
    let lastTime = performance.now()

    function loop(time) {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      elapsedRef.current += dt

      const speed = BASE_SPEED + SPEED_RAMP_PER_SECOND * elapsedRef.current
      distanceRef.current += speed * dt
      const score = Math.floor(distanceRef.current / 10)

      playerRef.current = applyGravity(playerRef.current, dt, GROUND_Y)

      spawnTimerRef.current += dt
      if (spawnTimerRef.current >= OBSTACLE_SPAWN_INTERVAL) {
        spawnTimerRef.current = 0
        obstaclesRef.current = spawnObstacle(obstaclesRef.current, GROUND_Y)
      }
      obstaclesRef.current = moveObstacles(obstaclesRef.current, dt, speed)

      draw(ctx, playerRef.current, obstaclesRef.current, score)

      if (checkCollision(playerRef.current, obstaclesRef.current)) {
        isRunningRef.current = false
        onGameOverRef.current?.(score)
        return
      }

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [])

  function handleJump() {
    if (!isRunningRef.current) return
    playerRef.current = jump(playerRef.current, GROUND_Y)
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        handleJump()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleJump}
      className="cursor-pointer rounded-lg border border-white/10"
    />
  )
}
