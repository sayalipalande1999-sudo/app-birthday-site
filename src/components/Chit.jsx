import { useState } from 'react'
import { publicAsset } from '../content/publicAsset.js'

export function Chit({
  chit,
  selected,
  onSelect,
}) {
  const [mediaFailed, setMediaFailed] = useState(false)

  return (
    <article className={`chit ${selected ? 'is-selected' : ''}`}>
      <button
        className="chit-button"
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
      >
        <span className="chit-symbol" aria-hidden="true">
          {selected ? '♥' : '♡'}
        </span>
        <span>{chit.label}</span>
      </button>
      {selected && chit.content?.type === 'image' && (
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
    </article>
  )
}
