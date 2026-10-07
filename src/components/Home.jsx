import { publicAsset } from '../content/publicAsset.js'

export function Home({ greeting, onOpenSurprise }) {
  return (
    <section className="home-view">
      <img
        className="home-background"
        src={publicAsset('images/home/birthday-background.jpg')}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="home-shade" aria-hidden="true" />
      <div className="home-content">
        <p className="eyebrow">A little something, just for you</p>
        <h1>
          <span className="sr-only">Happy Birthday</span>
          <span aria-hidden="true">Happy</span>
          <span aria-hidden="true">Birthday</span>
        </h1>
        <p className="home-recipient">{greeting.replace(/^happy birthday,?\s*/i, '')}</p>
        <p className="home-copy">
          Today is a celebration of you, and all the beautiful things you bring
          into my life.
        </p>
        <div className="home-divider" aria-hidden="true"><span>♡</span></div>
        <button
          className="button button-primary home-cta"
          onClick={onOpenSurprise}
        >
          Tap to open <span aria-hidden="true">→</span>
        </button>
      </div>
      <span className="home-bottom-mark" aria-hidden="true">⌄</span>
    </section>
  )
}
