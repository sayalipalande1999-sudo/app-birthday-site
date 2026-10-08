import { useEffect, useRef, useState } from 'react'
import { revealPasscode } from '../content/config.js'

export function PasscodeDialog({ onClose, onUnlock }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    inputRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  function handleSubmit(event) {
    event.preventDefault()
    if (code.trim() === revealPasscode) {
      setError('')
      onUnlock()
      return
    }

    setError('Oops. Not there yet. ')
  }

  return (
    <div
      className="passcode-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="passcode-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="passcode-title"
      >
        <button
          className="icon-button passcode-close"
          type="button"
          onClick={onClose}
          aria-label="Close passcode prompt"
        >
          ×
        </button>
        <span className="dialog-heart" aria-hidden="true">♡</span>
        <p className="eyebrow">Just between us</p>
        <h2 id="passcode-title">A little surprise</h2>
        <p>Enter your special code to see what’s inside.</p>
        <form onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="secret-passcode">Passcode</label>
          <input
            ref={inputRef}
            id="secret-passcode"
            type="password"
            inputMode="text"
            autoComplete="off"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setError('')
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'passcode-error' : undefined}
          />
          {error && (
            <p
              className="form-error"
              id="passcode-error"
              role="alert"
              aria-live="assertive"
            >
              <span aria-hidden="true">!</span> {error}
            </p>
          )}
          <button className="button button-primary" type="submit">
            Unlock the surprise
          </button>
        </form>
      </section>
    </div>
  )
}
