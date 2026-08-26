import { Vector3 } from 'three'

export function projectToScreen(object3D, camera, canvasSize, canvasRect) {
  const worldPos = new Vector3()
  object3D.getWorldPosition(worldPos)
  worldPos.project(camera)

  return {
    x: ((worldPos.x + 1) / 2) * canvasSize.width + canvasRect.left,
    y: ((1 - worldPos.y) / 2) * canvasSize.height + canvasRect.top,
  }
}
