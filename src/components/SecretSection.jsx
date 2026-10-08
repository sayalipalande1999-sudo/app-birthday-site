import sectionsContent from '../content/secrets.json'
import { Chit } from './Chit.jsx'
import '../styles/secret.css'

export function SecretSection({ selectedChits, onSelect }) {
  return (
    <section className="secret-view">
      <div className="section-heading">
        <p className="eyebrow">Pick your favorite</p>
        <h1>This or that</h1>
        <p>Choose one option from each pair to reveal your surprise.</p>
      </div>
      <div className="secret-sections">
        {sectionsContent.sections.map((section, index) => (
          <article className="secret-subsection" key={section.id}>
            <h2>
              <span className="section-number" aria-hidden="true">
                0{index + 1}
              </span>
              {section.label}
            </h2>
            <div className="chit-grid">
              {section.chits.map((chit) => (
                <Chit
                  key={chit.id}
                  chit={chit}
                  selected={selectedChits.get(section.id) === chit.id}
                  onSelect={() => onSelect(section.id, chit.id)}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
