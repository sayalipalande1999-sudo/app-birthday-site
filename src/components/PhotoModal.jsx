import { useEffect, useRef, useState } from 'react'
import { useSwipeNavigation } from '../hooks/useSwipeNavigation.js'

export function PhotoModal({
  photo,
  imageSrc,
  canGoPrevious,
  canGoNext,
  onClose,
  onPrevious,
  onNext,
}) {
  const closeButton = useRef(null)
  const [imageFailed, setImageFailed] = useState(false)
  const swipeHandlers = useSwipeNavigation(
    () => canGoPrevious && onPrevious(),
    () => canGoNext && onNext(),
  )

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && canGoPrevious) onPrevious()
      if (event.key === 'ArrowRight' && canGoNext) onNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [canGoNext, canGoPrevious, onClose, onNext, onPrevious])

  return (
    <div
      className="photo-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="photo-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo: ${photo.alt}`}
      >
        <div className="photo-modal-toolbar">
          <span>Our memories</span>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            ref={closeButton}
            aria-label="Close photo"
          >
            ×
          </button>
        </div>
        <div className="photo-modal-content" {...swipeHandlers}>
          <button
            className="modal-arrow modal-arrow-previous"
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            aria-label="Previous photo"
          >
            ‹
          </button>
          {imageFailed ? (
            <p className="image-fallback modal-image-fallback">{photo.alt}</p>
          ) : (
            <img
              className="modal-image"
              src={imageSrc}
              alt={photo.alt}
              onError={() => setImageFailed(true)}
            />
          )}
          <button
            className="modal-arrow modal-arrow-next"
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
        <p className="photo-modal-note">{photo.note}</p>
      </section>
    </div>
  )
}
