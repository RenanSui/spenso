import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { CreateTestProviders } from '@/lib/test-utils'
import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from 'next-themes'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

let localStorageMock: { [key: string]: string } = {}

beforeAll(() => {
  // Create a mock of the window.matchMedia function
  global.matchMedia = vi.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

  // Create mocks of localStorage getItem and setItem functions
  global.Storage.prototype.getItem = vi.fn(
    (key: string) => localStorageMock[key],
  )
  global.Storage.prototype.setItem = vi.fn((key: string, value: string) => {
    localStorageMock[key] = value
  })
})

beforeEach(() => {
  // Clear the localStorage-mock
  localStorageMock = {}
})

type CustomOptions = RenderOptions & { theme?: string }

const setup = (jsx: JSX.Element, { theme, ...options }: CustomOptions) => {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: CreateTestProviders({ theme }), ...options }),
  }
}

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme()
  return <span role="theme-spy">{theme}</span>
}

describe('Theme Toggle - Tests', () => {
  test('Should change theme on click', async () => {
    const { getByRole } = setup(
      <>
        <ThemeToggle />
        <ThemeSpy />
      </>,
      { theme: 'dark' },
    )

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('light-toggle'))
    expect(getByRole('theme-spy')).toHaveTextContent('light')

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('dark-toggle'))
    expect(getByRole('theme-spy')).toHaveTextContent('dark')

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('system-toggle'))
    expect(getByRole('theme-spy')).toHaveTextContent('system')
  })
})
