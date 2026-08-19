import { useEffect, useRef } from 'react'
import {
  applyGravity,
  jump,
  movePipes,
  spawnPipe,
  checkCollision,
  PIPE_WIDTH,
} from '../../../utils/games/flappyBirdPhysics.js'
import flappyPlayerSprite from './assets/components/flappy player.png'
import flappyMapBackground from './assets/components/map.png'
import flappyPipeSprite from './assets/components/pipe.png'
import jumpSound from './assets/audio/jump.mp3'

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 600
const PIPE_SPEED = 120
const PIPE_GAP_SIZE = 150
const PIPE_SPAWN_INTERVAL = 1.6
const BIRD_SPRITE_SIZE = 32

// pipe.png is a single "hangs from ceiling, cap at bottom" sprite; the shaft
// and cap are cropped from it and the whole thing is mirrored vertically to
// build the bottom pipe.
const PIPE_SHAFT_SRC = { x: 126, y: 0, w: 157, h: 400 }
const PIPE_CAP_SRC = { x: 119, y: 401, w: 171, h: 75 }
const PIPE_CAP_WIDTH = PIPE_WIDTH + 10
const PIPE_CAP_HEIGHT = Math.round(
  PIPE_CAP_SRC.h * (PIPE_CAP_WIDTH / PIPE_CAP_SRC.w),
)
const PIPE_CAP_OVERHANG = (PIPE_CAP_WIDTH - PIPE_WIDTH) / 2

const playerImage = new Image()
playerImage.src = flappyPlayerSprite

const mapImage = new Image()
mapImage.src = flappyMapBackground

const pipeImage = new Image()
pipeImage.src = flappyPipeSprite

function drawTopPipe(ctx, x, gapTop) {
  const shaftHeight = Math.max(0, gapTop - PIPE_CAP_HEIGHT)
  if (shaftHeight > 0) {
    const s = PIPE_SHAFT_SRC
    ctx.drawImage(pipeImage, s.x, s.y, s.w, s.h, x, 0, PIPE_WIDTH, shaftHeight)
  }
  const c = PIPE_CAP_SRC
  ctx.drawImage(
    pipeImage,
    c.x,
    c.y,
    c.w,
    c.h,
    x - PIPE_CAP_OVERHANG,
    shaftHeight,
    PIPE_CAP_WIDTH,
    PIPE_CAP_HEIGHT,
  )
}

function drawBottomPipe(ctx, x, gapBottom) {
  const shaftHeight = Math.max(0, CANVAS_HEIGHT - gapBottom - PIPE_CAP_HEIGHT)
  ctx.save()
  ctx.translate(0, CANVAS_HEIGHT)
  ctx.scale(1, -1)
  if (shaftHeight > 0) {
    const s = PIPE_SHAFT_SRC
    ctx.drawImage(pipeImage, s.x, s.y, s.w, s.h, x, 0, PIPE_WIDTH, shaftHeight)
  }
  const c = PIPE_CAP_SRC
  ctx.drawImage(
    pipeImage,
    c.x,
    c.y,
    c.w,
    c.h,
    x - PIPE_CAP_OVERHANG,
    shaftHeight,
    PIPE_CAP_WIDTH,
    PIPE_CAP_HEIGHT,
  )
  ctx.restore()
}

function draw(ctx, bird, pipes, score) {
  if (mapImage.complete) {
    ctx.drawImage(mapImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  } else {
    ctx.fillStyle = '#0d0d0d'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  for (const pipe of pipes) {
    const gapTop = pipe.gapCenter - pipe.gapSize / 2
    const gapBottom = pipe.gapCenter + pipe.gapSize / 2
    if (pipeImage.complete) {
      drawTopPipe(ctx, pipe.x, gapTop)
      drawBottomPipe(ctx, pipe.x, gapBottom)
    } else {
      ctx.fillStyle = '#22c55e'
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, gapTop)
      ctx.fillRect(pipe.x, gapBottom, PIPE_WIDTH, CANVAS_HEIGHT - gapBottom)
    }
  }

  if (playerImage.complete) {
    const tilt = Math.max(-0.5, Math.min(0.9, bird.velocity / 700))
    ctx.save()
    ctx.translate(bird.x, bird.y)
    ctx.rotate(tilt)
    ctx.drawImage(
      playerImage,
      -BIRD_SPRITE_SIZE / 2,
      -BIRD_SPRITE_SIZE / 2,
      BIRD_SPRITE_SIZE,
      BIRD_SPRITE_SIZE,
    )
    ctx.restore()
  }

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 24px sans-serif'
  ctx.fillText(String(score), CANVAS_WIDTH / 2 - 8, 40)
}

export default function FlappyBirdCanvas({ paused, onGameOver }) {
  const canvasRef = useRef(null)
  const birdRef = useRef({ x: 80, y: CANVAS_HEIGHT / 2, velocity: 0 })
  const pipesRef = useRef([])
  const scoreRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const isRunningRef = useRef(true)
  const onGameOverRef = useRef(onGameOver)
  const pausedRef = useRef(paused)
  const jumpAudioRef = useRef(null)

  useEffect(() => {
    onGameOverRef.current = onGameOver
  }, [onGameOver])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    jumpAudioRef.current = new Audio(jumpSound)
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    if (paused) {
      draw(ctx, birdRef.current, pipesRef.current, scoreRef.current)
      return
    }

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
  }, [paused])

  function handleJump() {
    if (!isRunningRef.current || pausedRef.current) return
    birdRef.current = jump(birdRef.current)
    if (jumpAudioRef.current) {
      jumpAudioRef.current.currentTime = 0
      jumpAudioRef.current.play().catch(() => {})
    }
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
