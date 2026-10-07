import '../styles/envelope.css'

export function Envelope({ message, opened, onOpen, onViewPhotos }) {
  return (
    <section className="envelope-view">
      <p className="eyebrow">A letter for you</p>
      <h1>Something from my heart</h1>
      <div className={`envelope-scene ${opened ? 'is-open' : ''}`}>
        <div
          className="letter-reveal"
          aria-hidden={!opened}
          inert={!opened}
        >
          <div className="letter-paper">
            <p>{message}</p>
          </div>
        </div>
        <button
          className={`envelope ${opened ? 'is-open' : ''}`}
          onClick={onOpen}
          aria-expanded={opened}
          aria-label={opened ? 'Letter opened' : 'Open the birthday letter'}
        >
          <span className="envelope-back" aria-hidden="true" />
          <span className="envelope-letter" aria-hidden="true" />
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
          <button className="button button-primary" onClick={onViewPhotos}>
            View Photos <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <p className="envelope-hint">Tap the envelope to open your letter</p>
      )}
    </section>
  )
}
