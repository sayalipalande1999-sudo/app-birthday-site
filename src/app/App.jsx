import { useEffect, useState } from 'react'
import { Envelope } from '../components/Envelope.jsx'
import { Gallery } from '../components/Gallery.jsx'
import { Home } from '../components/Home.jsx'
import { PasscodeDialog } from '../components/PasscodeDialog.jsx'
import { SecretSection } from '../components/SecretSection.jsx'
import birthday from '../content/birthday.json'
import { getCurrentRoute, navigate, ROUTES } from './navigation.js'

function App() {
  const [route, setRoute] = useState(() =>
    getCurrentRoute() === ROUTES.secret ? ROUTES.home : getCurrentRoute(),
  )
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [passcodeOpen, setPasscodeOpen] = useState(
    () => getCurrentRoute() === ROUTES.secret,
  )
  const [revealedChits, setRevealedChits] = useState(() => new Set())

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getCurrentRoute()
      if (nextRoute === ROUTES.secret && !secretUnlocked) {
        setPasscodeOpen(true)
        navigate(ROUTES.home)
        return
      }

      setRoute(nextRoute)
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [secretUnlocked])

  useEffect(() => {
    if (getCurrentRoute() === ROUTES.secret && !secretUnlocked) {
      navigate(ROUTES.home)
    }
  }, [secretUnlocked])

  function unlockSecret() {
    setSecretUnlocked(true)
    setPasscodeOpen(false)
    navigate(ROUTES.secret)
  }

  function revealChit(id) {
    setRevealedChits((current) => {
      const next = new Set(current)
      next.add(id)
      return next
    })
  }

  return (
    <div
      className={`app-shell${route === ROUTES.home ? ' is-home' : ''}${route === ROUTES.gallery ? ' is-gallery' : ''}`}
    >
      <header className="site-header">
        <a className="wordmark" href="#/" aria-label="Birthday surprise home">
          for you, always
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <button type="button" onClick={() => navigate(ROUTES.home)}>
            Home
          </button>
          <button type="button" onClick={() => navigate(ROUTES.envelope)}>
            Letter
          </button>
          <button type="button" onClick={() => navigate(ROUTES.gallery)}>
            Photos
          </button>
          <button
            type="button"
            onClick={() =>
              secretUnlocked
                ? navigate(ROUTES.secret)
                : setPasscodeOpen(true)
            }
          >
            Secret
          </button>
        </nav>
      </header>

      <main id="main-content" className="page-content">
        {route === ROUTES.home && (
          <Home
            greeting={birthday.greeting}
            onOpenSurprise={() => navigate(ROUTES.envelope)}
          />
        )}
        {route === ROUTES.envelope && (
          <Envelope
            message={birthday.envelopeMessage}
            opened={envelopeOpened}
            onOpen={() => setEnvelopeOpened(true)}
            onViewPhotos={() => navigate(ROUTES.gallery)}
          />
        )}
        {route === ROUTES.gallery && <Gallery />}
        {route === ROUTES.secret && secretUnlocked && (
          <SecretSection
            revealedChits={revealedChits}
            onReveal={revealChit}
          />
        )}
      </main>

      {route !== ROUTES.home && (
        <footer className="site-footer">Made with a whole lot of love</footer>
      )}

      {passcodeOpen && (
        <PasscodeDialog
          onClose={() => setPasscodeOpen(false)}
          onUnlock={unlockSecret}
        />
      )}
    </div>
  )
}

export default App
