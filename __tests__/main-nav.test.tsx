import { MainNav } from '@/components/layouts/main-nav'
import { MainNavItem } from '@/types'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

global.ResizeObserver = class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(cb: any) {
    this.cb = cb
  }

  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }])
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unobserve() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
} as never

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('Mobile Nav - Tests', () => {
  test('Should show navigation menu on hover', async () => {
    const mockMainItems: MainNavItem[] = [
      {
        title: 'Dashboard',
        items: [
          {
            title: 'Main Nav Test Title',
            href: '/test',
            description: 'test',
            disabled: false,
            items: [],
          },
        ],
      },
    ]

    const { user } = setup(<MainNav items={mockMainItems} />)

    await user.hover(screen.getByRole('button', { name: 'main-nav-trigger' }))

    await waitFor(
      () => expect(screen.getByText(/Main Nav Test Title/i)).toBeInTheDocument,
      { timeout: 700 },
    )
  })
})
