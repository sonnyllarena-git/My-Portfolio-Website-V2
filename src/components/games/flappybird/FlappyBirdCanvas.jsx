import { useEffect, useRef } from 'react'
import {
  applyGravity,
  jump,
  movePipes,
  spawnPipe,
  checkCollision,
  PIPE_WIDTH,
} from '../../../utils/games/flappyBirdPhysics.js'

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const PIPE_SPEED = 120
const PIPE_GAP_SIZE = 150
const PIPE_SPAWN_INTERVAL = 1.6

function draw(ctx, bird, pipes, score) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.fillStyle = '#0d0d0d'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  ctx.fillStyle = '#22c55e'
  for (const pipe of pipes) {
    const gapTop = pipe.gapCenter - pipe.gapSize / 2
    const gapBottom = pipe.gapCenter + pipe.gapSize / 2
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, gapTop)
    ctx.fillRect(pipe.x, gapBottom, PIPE_WIDTH, CANVAS_HEIGHT - gapBottom)
  }

  ctx.font = '32px serif'
  ctx.fillText('🐦', bird.x - 16, bird.y + 12)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 24px sans-serif'
  ctx.fillText(String(score), CANVAS_WIDTH / 2 - 8, 40)
}

export default function FlappyBirdCanvas({ onGameOver }) {
  const canvasRef = useRef(null)
  const birdRef = useRef({ x: 80, y: CANVAS_HEIGHT / 2, velocity: 0 })
  const pipesRef = useRef([])
  const scoreRef = useRef(0)
  const spawnTimerRef = useRef(0)
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

      birdRef.current = applyGravity(birdRef.current, dt)

      spawnTimerRef.current += dt
      if (spawnTimerRef.current >= PIPE_SPAWN_INTERVAL) {
        spawnTimerRef.current = 0
        pipesRef.current = spawnPipe(
          pipesRef.current,
          CANVAS_HEIGHT,
          PIPE_GAP_SIZE,
        )
      }
      pipesRef.current = movePipes(pipesRef.current, dt, PIPE_SPEED)

      for (const pipe of pipesRef.current) {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < birdRef.current.x) {
          pipe.passed = true
          scoreRef.current += 1
        }
      }

      draw(ctx, birdRef.current, pipesRef.current, scoreRef.current)

      const collided = checkCollision(
        birdRef.current,
        pipesRef.current,
        CANVAS_HEIGHT,
      )
      if (collided) {
        isRunningRef.current = false
        onGameOverRef.current?.(scoreRef.current)
        return
      }

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [])

  function handleJump() {
    if (!isRunningRef.current) return
    birdRef.current = jump(birdRef.current)
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
