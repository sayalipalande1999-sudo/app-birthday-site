import { useState } from 'react'
import { PhotoModal } from './PhotoModal.jsx'
import { publicAsset } from '../content/publicAsset.js'
import galleryContent from '../content/gallery.json'
import '../styles/gallery.css'

export function Gallery({ onContinueToLetter }) {
  const [photoIndex, setPhotoIndex] = useState(null)
  const [failedImages, setFailedImages] = useState(() => new Set())
  const photos = galleryContent.gallery
  const selectedPhoto = photoIndex === null ? null : photos[photoIndex]

  function markImageFailed(id) {
    setFailedImages((current) => new Set(current).add(id))
  }

  return (
    <section className="gallery-view">
      <div className="section-heading">
        <p className="eyebrow">Little moments, big love</p>
        <h1>Our memories</h1>
        <p>Every photo holds a piece of my favorite story: us.</p>
      </div>

      {photos.length === 0 ? (
        <p className="empty-state">
          Our photo memories are on their way. Check back soon for a few little
          moments saved just for you.
        </p>
      ) : (
        <div className="photo-list">
          {photos.map((photo, index) => (
            <article className="photo-card" key={photo.id}>
              <button
                className="photo-card-image"
                type="button"
                onClick={() => setPhotoIndex(index)}
                aria-label={`Open photo: ${photo.alt}`}
              >
                {failedImages.has(photo.id) ? (
                  <span className="image-fallback">{photo.alt}</span>
                ) : (
                  <img
                    src={publicAsset(photo.thumbnail)}
                    alt={photo.alt}
                    loading="lazy"
                    onError={() => markImageFailed(photo.id)}
                  />
                )}
                <span className="photo-open-hint" aria-hidden="true">View ♥</span>
              </button>
              <p className="photo-note-preview">{photo.preview}</p>
            </article>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <PhotoModal
          key={selectedPhoto.id}
          photo={selectedPhoto}
          imageSrc={publicAsset(selectedPhoto.fullImage)}
          canGoPrevious={photoIndex > 0}
          canGoNext={photoIndex < photos.length - 1}
          onClose={() => setPhotoIndex(null)}
          onPrevious={() => setPhotoIndex((index) => Math.max(0, index - 1))}
          onNext={() =>
            setPhotoIndex((index) => Math.min(photos.length - 1, index + 1))
          }
        />
      )}
      <div className="gallery-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={onContinueToLetter}
        >
          Continue to the letter <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
