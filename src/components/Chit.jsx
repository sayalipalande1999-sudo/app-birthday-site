import { useState } from 'react'
import { publicAsset } from '../content/publicAsset.js'

export function Chit({
  chit,
  revealed,
  onReveal,
  onUnavailable,
}) {
  const [mediaFailed, setMediaFailed] = useState(false)
  const isUnavailable = chit.availability === 'unavailable'

  return (
    <article className={`chit ${revealed ? 'is-revealed' : ''}`}>
      <button
        className="chit-button"
        type="button"
        onClick={isUnavailable ? onUnavailable : () => onReveal(chit.id)}
        aria-expanded={isUnavailable ? undefined : revealed}
      >
        <span className="chit-symbol" aria-hidden="true">
          {isUnavailable ? '· · ·' : revealed ? '♥' : '♡'}
        </span>
        <span>
          {isUnavailable
            ? 'A little mystery'
            : revealed
              ? 'Your note'
              : 'Tap to reveal'}
        </span>
      </button>
      {revealed && chit.content?.type === 'text' && (
        <p className="chit-content">{chit.content.value}</p>
      )}
      {revealed && chit.content?.type === 'image' && (
        mediaFailed ? (
          <p className="image-fallback">{chit.content.alt}</p>
        ) : (
          <img
            className="chit-image"
            src={publicAsset(chit.content.value)}
            alt={chit.content.alt}
            onError={() => setMediaFailed(true)}
          />
        )
      )}
      {revealed && chit.content?.type === 'audio' && (
        mediaFailed ? (
          <p className="image-fallback">This audio message is unavailable.</p>
        ) : (
          <audio
            controls
            preload="none"
            src={publicAsset(chit.content.value)}
            onError={() => setMediaFailed(true)}
          >
            Audio playback is not supported by this browser.
          </audio>
        )
      )}
    </article>
  )
}
