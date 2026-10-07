import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../../src/app/App.jsx'

describe('birthday surprise journey', () => {
  it('opens the letter, browses photos, unlocks the secrets, and preserves revealed chits', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Happy Birthday' }))
      .toBeInTheDocument()
    expect(document.querySelector('.app-shell')).toHaveClass('is-home')
    expect(document.querySelector('.home-background'))
      .toHaveAttribute('src', '/images/home/birthday-background.jpg')
    await user.click(screen.getByRole('button', { name: /Tap to open/ }))
    expect(window.location.hash).toBe('#/envelope')

    await user.click(
      await screen.findByRole('button', { name: 'Open the birthday letter' }),
    )
    expect(
      screen.getByText(/Happy Birthday, my love —/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/how deeply you are loved\.$/),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Letter opened' }),
    ).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: /View Photos/ }))
    expect(window.location.hash).toBe('#/gallery')
    expect(screen.getAllByRole('article', { name: '' })).toHaveLength(3)

    await user.click(
      screen.getByRole('button', { name: /Open photo: A couple sitting close together/ }),
    )
    expect(
      within(screen.getByRole('dialog')).getByText(
        'A quiet little moment together that means the world to me. Happy birthday, my love.',
      ),
    ).toBeInTheDocument()
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Next photo' }),
    )
    expect(
      within(screen.getByRole('dialog')).getByText(
        'Replace this example with a favorite photo and the story you want to remember together.',
      ),
    ).toBeInTheDocument()
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Next photo' }),
    )
    expect(
      within(screen.getByRole('dialog')).getByText(
        'Add your own note here: a small detail from a day together that still makes you smile.',
      ),
    ).toBeInTheDocument()
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Close photo' }),
    )
    expect(screen.getAllByText(/favorite story: us/)).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Secret' }))
    await user.type(screen.getByLabelText('Passcode'), '0000')
    await user.click(screen.getByRole('button', { name: 'Unlock the surprise' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Try again')
    expect(
      screen.queryByText('My favorite part of that day was laughing with you.'),
    ).not.toBeInTheDocument()

    await user.clear(screen.getByLabelText('Passcode'))
    await user.type(screen.getByLabelText('Passcode'), '1234')
    await user.click(screen.getByRole('button', { name: 'Unlock the surprise' }))

    expect(await screen.findByRole('heading', { name: 'A few little secrets' }))
      .toBeInTheDocument()
    expect(document.querySelectorAll('.secret-subsection')).toHaveLength(4)
    expect(document.querySelectorAll('.chit-button')).toHaveLength(8)

    await user.click(screen.getAllByRole('button', { name: 'Tap to reveal' })[0])
    const revealedMessage =
      'My favorite part of that day was laughing with you.'
    expect(screen.getByText(revealedMessage)).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'Your note' })[0])
    expect(screen.getByText(revealedMessage)).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: 'A little mystery' })[0])
    expect(screen.getByRole('status')).toHaveTextContent('Not available')

    await user.click(screen.getByRole('button', { name: 'Home' }))
    await user.click(screen.getByRole('button', { name: 'Secret' }))
    expect(screen.getByText(revealedMessage)).toBeInTheDocument()
  })
})
