import { SiteHeader } from '@/components/layouts/site-header'
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

describe('Site Header - Tests', () => {
  test('should show Sign in on session null', () => {
    useSelectedLayoutSegmentMocked.mockReturnValue('')

    setup(<SiteHeader user={null} />)

    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })
})
