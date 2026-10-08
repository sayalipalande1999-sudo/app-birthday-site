import '../styles/envelope.css'
import { publicAsset } from '../content/publicAsset.js'

export function Envelope({ message, opened, onOpen, onOpenSurprise }) {
  return (
    <section
      className="envelope-view"
      style={{
        '--letter-background-image': `url("${publicAsset('images/letter/letter-background.jpg')}")`,
      }}
    >
      <p className="eyebrow">A letter for you</p>
      <h1>Something from my heart</h1>
      <div className={`envelope-scene ${opened ? 'is-open' : ''}`}>
        <div
          className="letter-reveal"
          aria-hidden={!opened}
          inert={!opened}
        >
          <div className="letter-paper">
            <p className="letter-greeting">To my favorite person</p>
            <p>{message}</p>
            <p className="letter-signoff">With all my love, <span aria-hidden="true">♥</span></p>
          </div>
        </div>
        <button
          className={`envelope ${opened ? 'is-open' : ''}`}
          onClick={onOpen}
          aria-expanded={opened}
          aria-label={opened ? 'Letter opened' : 'Open the birthday letter'}
        >
          <span className="envelope-back" aria-hidden="true" />
          <span className="envelope-flap" aria-hidden="true" />
          <span className="envelope-front" aria-hidden="true" />
          {!opened && <span className="envelope-seal" aria-hidden="true">♥</span>}
          <span className="sr-only">
            {opened ? 'Letter opened' : 'Tap to open your letter'}
          </span>
        </button>
      </div>
      {opened ? (
        <div className="envelope-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={onOpenSurprise}
          >
            Open your surprise <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <p className="envelope-hint">Tap the seal to open your letter</p>
      )}
    </section>
  )
}
