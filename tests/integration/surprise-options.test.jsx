import { useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import sectionsContent from '../../src/content/secrets.json'
import { SecretSection } from '../../src/components/SecretSection.jsx'

function SurpriseHarness() {
  const [selectedChits, setSelectedChits] = useState(() => new Map())

  function selectChit(sectionId, chitId) {
    setSelectedChits((current) => new Map(current).set(sectionId, chitId))
  }

  return (
    <SecretSection
      selectedChits={selectedChits}
      onSelect={selectChit}
    />
  )
}

describe('surprise choices', () => {
  it('reveals an image for one selected choice in each category', async () => {
    const user = userEvent.setup()
    render(<SurpriseHarness />)

    expect(screen.getByRole('heading', { name: 'This or that' }))
      .toBeInTheDocument()

    const surpriseSections = document.querySelectorAll('.secret-subsection')
    expect(surpriseSections).toHaveLength(sectionsContent.sections.length)

    for (const [index, section] of surpriseSections.entries()) {
      const category = sectionsContent.sections[index]
      expect(
        within(section).getByRole('heading', { name: category.label }),
      ).toBeInTheDocument()

      const choices = category.chits.map((chit) =>
        within(section).getByRole('button', { name: chit.label }),
      )
      expect(choices).toHaveLength(2)

      await user.click(choices[0])
      expect(choices[0]).toHaveAttribute('aria-pressed', 'true')
      expect(choices[1]).toHaveAttribute('aria-pressed', 'false')
      expect(within(section).getAllByRole('img')).toHaveLength(1)
      expect(within(section).getByRole('img').getAttribute('src'))
        .toContain(category.chits[0].content.value)

      await user.click(choices[1])
      expect(choices[0]).toHaveAttribute('aria-pressed', 'false')
      expect(choices[1]).toHaveAttribute('aria-pressed', 'true')
      expect(within(section).getAllByRole('img')).toHaveLength(1)
      expect(within(section).getByRole('img').getAttribute('src'))
        .toContain(category.chits[1].content.value)

      for (const chit of category.chits) {
        expect(chit.content.type).toBe('image')
      }
    }
  })
})
