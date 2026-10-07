import { useRef } from 'react'

const SWIPE_THRESHOLD = 48

export function useSwipeNavigation(onPrevious, onNext) {
  const start = useRef(null)

  function onTouchStart(event) {
    const touch = event.changedTouches[0]
    start.current = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchEnd(event) {
    if (!start.current) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.current.x
    const deltaY = touch.clientY - start.current.y
    start.current = null

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return
    }

    if (deltaX < 0) onNext()
    else onPrevious()
  }

  return { onTouchStart, onTouchEnd }
}
