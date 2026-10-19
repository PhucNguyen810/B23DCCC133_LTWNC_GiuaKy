import { useContext } from 'react'
import { ThemeContext } from './themeContext'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme phải được sử dụng bên trong ThemeProvider.')
  return context
}
