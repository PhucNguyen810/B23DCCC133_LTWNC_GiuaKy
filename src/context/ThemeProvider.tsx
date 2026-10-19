import { useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './themeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}><div className="app-shell" data-theme={theme}>{children}</div></ThemeContext.Provider>
}
