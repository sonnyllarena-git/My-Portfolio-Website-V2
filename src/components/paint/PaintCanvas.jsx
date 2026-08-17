import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { floodFill } from '../../utils/floodFill.js'

const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 800
const SHAPE_TOOLS = ['line', 'rectangle', 'circle']

function hexToRgba(hex) {
  const value = hex.replace('#', '')
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
    255,
  ]
}

const PaintCanvas = forwardRef(function PaintCanvas(
  { tool, color, size, opacity, onHistoryChange },
  ref,
) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0 })
  const undoStackRef = useRef([])
  const redoStackRef = useRef([])
  const shapeStartRef = useRef({ x: 0, y: 0 })
  const shapeBaseRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }, [])

  function reportHistory() {
    onHistoryChange?.({
      canUndo: undoStackRef.current.length > 0,
      canRedo: redoStackRef.current.length > 0,
    })
  }

  function snapshot() {
    const ctx = canvasRef.current.getContext('2d')
    return ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  function pointFromEvent(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = CANVAS_WIDTH / rect.width
    const scaleY = CANVAS_HEIGHT / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  function strokeTo(point) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.globalAlpha = opacity
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    lastPointRef.current = point
  }

  function drawShapePreview(point) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.putImageData(shapeBaseRef.current, 0, 0)
    ctx.globalAlpha = opacity
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    const { x: startX, y: startY } = shapeStartRef.current
    ctx.beginPath()
    if (tool === 'line') {
      ctx.moveTo(startX, startY)
      ctx.lineTo(point.x, point.y)
    } else if (tool === 'rectangle') {
      ctx.rect(startX, startY, point.x - startX, point.y - startY)
    } else if (tool === 'circle') {
      const rx = Math.abs(point.x - startX) / 2
      const ry = Math.abs(point.y - startY) / 2
      const cx = (startX + point.x) / 2
      const cy = (startY + point.y) / 2
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
    }
    ctx.stroke()
  }

  function handlePointerDown(e) {
    const isKnownTool =
      tool === 'brush' ||
      tool === 'eraser' ||
      tool === 'fill' ||
      SHAPE_TOOLS.includes(tool)
    if (!isKnownTool) return

    const before = snapshot()
    undoStackRef.current.push(before)
    redoStackRef.current = []
    reportHistory()
    const point = pointFromEvent(e)

    if (tool === 'fill') {
      const ctx = canvasRef.current.getContext('2d')
      const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      floodFill(
        imageData,
        Math.floor(point.x),
        Math.floor(point.y),
        hexToRgba(color),
      )
      ctx.putImageData(imageData, 0, 0)
      return
    }

    canvasRef.current.setPointerCapture(e.pointerId)
    isDrawingRef.current = true
    if (SHAPE_TOOLS.includes(tool)) {
      shapeStartRef.current = point
      shapeBaseRef.current = before
    } else {
      lastPointRef.current = point
      strokeTo(point)
    }
  }

  function handlePointerMove(e) {
    if (!isDrawingRef.current) return
    const point = pointFromEvent(e)
    if (SHAPE_TOOLS.includes(tool)) {
      drawShapePreview(point)
    } else {
      strokeTo(point)
    }
  }

  function handlePointerUp() {
    isDrawingRef.current = false
  }

  useImperativeHandle(ref, () => ({
    undo() {
      if (undoStackRef.current.length === 0) return
      redoStackRef.current.push(snapshot())
      const previous = undoStackRef.current.pop()
      canvasRef.current.getContext('2d').putImageData(previous, 0, 0)
      reportHistory()
    },
    redo() {
      if (redoStackRef.current.length === 0) return
      undoStackRef.current.push(snapshot())
      const next = redoStackRef.current.pop()
      canvasRef.current.getContext('2d').putImageData(next, 0, 0)
      reportHistory()
    },
    clear() {
      undoStackRef.current.push(snapshot())
      redoStackRef.current = []
      const ctx = canvasRef.current.getContext('2d')
      ctx.globalAlpha = 1
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      reportHistory()
    },
    getDataUrl() {
      return canvasRef.current.toDataURL('image/png')
    },
  }))

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="h-full w-full touch-none bg-white"
    />
  )
})

export default PaintCanvas
