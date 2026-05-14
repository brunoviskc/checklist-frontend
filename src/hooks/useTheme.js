import React from 'react';

const ThemeContext = React.createContext(null);
const STORAGE_KEY = 'checklist-theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = React.useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
  }), [theme]);

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
}