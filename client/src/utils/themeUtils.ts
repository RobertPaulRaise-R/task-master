export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export function getInitialTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === THEME.LIGHT || savedTheme === THEME.DARK) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME.DARK
    : THEME.LIGHT;
}
