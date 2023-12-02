import { ThemeToggle } from '@/components/layouts/theme-toggle'
import { CreateTestProviders } from '@/lib/test-utils'
import '@testing-library/jest-dom'
import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

let localStorageMock: { [key: string]: string } = {}

beforeAll(() => {
  // Create a mock of the window.matchMedia function
  global.matchMedia = jest.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))

  // Create mocks of localStorage getItem and setItem functions
  global.Storage.prototype.getItem = jest.fn(
    (key: string) => localStorageMock[key],
  )
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
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

describe('Theme Toggle - Tests', () => {
  test('Should change theme on click', async () => {
    const { getByRole } = setup(<ThemeToggle />, { theme: 'dark' })

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('light-toggle'))
    expect(getByRole('current-theme')).toHaveTextContent('light')

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('dark-toggle'))
    expect(getByRole('current-theme')).toHaveTextContent('dark')

    await userEvent.click(getByRole('button', { name: 'theme-toggler' }))
    await userEvent.click(getByRole('system-toggle'))
    expect(getByRole('current-theme')).toHaveTextContent('system')
  })
})
