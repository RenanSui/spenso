import { ThemeProvider } from 'next-themes'

type TestProviderOptions = { theme?: string }

export const CreateTestProviders =
  ({ theme = 'dark' }: TestProviderOptions) =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider defaultTheme={theme} enableSystem={false} attribute="class">
      {children}
    </ThemeProvider>
  )
