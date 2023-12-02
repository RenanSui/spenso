import { MobileNav } from '@/components/layouts/mobile-nav'
import { NavItemWithChildren } from '@/types'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const useSelectedLayoutSegmentMocked = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSelectedLayoutSegment: () => useSelectedLayoutSegmentMocked(),
}))

describe('Mobile Nav - Tests', () => {
  test('Should show accordion on click', async () => {
    useSelectedLayoutSegmentMocked.mockReturnValue('')

    const mockSideBarItems: NavItemWithChildren = {
      title: 'mobile nav test',
      href: '/teste',
      disabled: false,
      icon: 'listBulletIcon',
      description: 'test',
      items: [],
    }

    const { user } = setup(<MobileNav sidebarNavItems={[mockSideBarItems]} />)

    await user.click(screen.getByRole('button', { name: 'mobile-nav-trigger' }))

    expect(screen.getByText('mobile nav test')).toBeInTheDocument()
  })
})
