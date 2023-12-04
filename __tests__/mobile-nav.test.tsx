import { MobileNav } from '@/components/layouts/mobile-nav'
import { NavItemWithChildren } from '@/types'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

const setup = (jsx: JSX.Element) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const useSelectedLayoutSegmentMocked = vi.fn()
vi.mock('next/navigation', async () => ({
  ...(await vi.importActual('next/navigation')),
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
