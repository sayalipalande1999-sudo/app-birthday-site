import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/app/App.jsx'
import sectionsContent from '../../src/content/secrets.json'

describe('birthday surprise journey', () => {
  it('unlocks this-or-that choices and remembers one image choice per category', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Happy Birthday' }))
      .toBeInTheDocument()
    expect(document.querySelector('.home-background'))
      .toHaveAttribute('src', '/images/home/birthday-background.jpeg')
    expect(
      within(screen.getByRole('navigation', { name: 'Main navigation' }))
        .getAllByRole('button')
        .map((button) => button.textContent),
    ).toEqual(['Home', 'Photos', 'Letter', 'Surprise'])

    await user.click(screen.getByRole('button', { name: 'Explore our photos' }))
    expect(window.location.hash).toBe('#/gallery')
    expect(screen.getByRole('heading', { name: 'Our memories' }))
      .toBeInTheDocument()

    await user.click(document.querySelector('.photo-card-image'))
    expect(screen.getByRole('dialog', { name: /Photo:/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Close photo' }))
    await user.click(
      screen.getByRole('button', { name: 'Continue to the letter' }),
    )
    expect(window.location.hash).toBe('#/envelope')

    await user.click(
      screen.getByRole('button', { name: 'Open the birthday letter' }),
    )
    expect(document.querySelector('.envelope-scene')).toHaveClass('is-open')
    expect(document.querySelector('.letter-reveal'))
      .toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByText('With all my love,')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open your surprise' }))
    expect(screen.getByRole('dialog', { name: 'A little surprise' }))
      .toBeInTheDocument()
    await user.type(screen.getByLabelText('Passcode'), 'not-the-code')
    await user.click(screen.getByRole('button', { name: 'Unlock the surprise' }))
    expect(screen.getByRole('alert'))
      .toHaveTextContent('Oops. Not there yet.')
    expect(screen.getByLabelText('Passcode')).toHaveAttribute('aria-invalid', 'true')

    await user.clear(screen.getByLabelText('Passcode'))
    await user.type(screen.getByLabelText('Passcode'), 'Green@welcome27')
    await user.click(screen.getByRole('button', { name: 'Unlock the surprise' }))

    expect(await screen.findByRole('heading', { name: 'This or that' }))
      .toBeInTheDocument()

    const surpriseSections = document.querySelectorAll('.secret-subsection')
    expect(surpriseSections).toHaveLength(sectionsContent.sections.length)

    for (const [index, section] of surpriseSections.entries()) {
      const category = sectionsContent.sections[index]
      const firstChoice = within(section).getByRole('button', {
        name: category.chits[0].label,
      })
      const secondChoice = within(section).getByRole('button', {
        name: category.chits[1].label,
      })

      await user.click(secondChoice)
      expect(secondChoice).toHaveAttribute('aria-pressed', 'true')
      expect(firstChoice).toHaveAttribute('aria-pressed', 'false')
      expect(
        within(section).getByRole('img', { name: category.chits[1].content.alt }),
      ).toBeInTheDocument()
    }

    const firstSection = surpriseSections[0]
    const firstCategory = sectionsContent.sections[0]
    await user.click(
      within(firstSection).getByRole('button', {
        name: firstCategory.chits[0].label,
      }),
    )
    expect(
      within(firstSection).getByRole('img', {
        name: firstCategory.chits[0].content.alt,
      }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Home' }))
    await user.click(screen.getByRole('button', { name: 'Surprise' }))
    expect(
      within(document.querySelectorAll('.secret-subsection')[0]).getByRole('img', {
        name: firstCategory.chits[0].content.alt,
      }),
    ).toBeInTheDocument()
  })
})
