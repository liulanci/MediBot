import { useDraggable } from '@vueuse/core'

export function useDraggablePosition(initialX = 0, initialY = 0) {
  const { style, x, y, isDragging } = useDraggable(undefined, {
    initialValue: { x: initialX, y: initialY }
  })

  return {
    style,
    x,
    y,
    isDragging
  }
}
