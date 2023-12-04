import { UserDropdown } from '@/components/user-dropdown'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('User Dropdown - Tests', () => {
  test('Should show email on dropdown', async () => {
    const mockSession = {
      name: 'a',
      email: 'b@gmail.com',
      image: 'c',
    }

    const { user } = setup(<UserDropdown user={mockSession} />)

    await user.click(screen.getByRole('button', { name: 'user-menu-trigger' }))

    expect(screen.getByText('b@gmail.com')).toBeInTheDocument()
  })
})
