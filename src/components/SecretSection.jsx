import { useState } from 'react'
import sectionsContent from '../content/secrets.json'
import { Chit } from './Chit.jsx'
import '../styles/secret.css'

export function SecretSection({ revealedChits, onReveal }) {
  const [notice, setNotice] = useState('')

  return (
    <section className="secret-view">
      <div className="section-heading">
        <p className="eyebrow">You found it</p>
        <h1>A few little secrets</h1>
        <p>Pick a memory and see what’s waiting for you.</p>
      </div>
      <div className="secret-sections">
        {sectionsContent.sections.map((section, index) => (
          <article className="secret-subsection" key={section.id}>
            <h2>
              <span className="section-number">0{index + 1}</span>
              {section.label}
            </h2>
            <div className="chit-grid">
              {section.chits.map((chit) => (
                <Chit
                  key={chit.id}
                  chit={chit}
                  revealed={revealedChits.has(chit.id)}
                  onReveal={onReveal}
                  onUnavailable={() => setNotice('Not available')}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="secret-notice" role="status" aria-live="polite">{notice}</p>
    </section>
  )
}
