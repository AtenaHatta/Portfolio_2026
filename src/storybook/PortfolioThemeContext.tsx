import type React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { getColors } from '../config/colors';

type Theme = 'light' | 'dark';

type PortfolioThemeValue = {
  theme: Theme;
  isDarkMode: boolean;
  colors: ReturnType<typeof getColors>;
};

const PortfolioThemeContext = createContext<PortfolioThemeValue | null>(null);

export function PortfolioThemeProvider({
  theme = 'light',
  children,
}: {
  theme?: Theme;
  children: React.ReactNode;
}) {
  const value = useMemo(() => {
    const isDarkMode = theme === 'dark';
    return {
      theme,
      isDarkMode,
      colors: getColors(isDarkMode),
    };
  }, [theme]);
  return <PortfolioThemeContext.Provider value={value}>{children}</PortfolioThemeContext.Provider>;
}

export function usePortfolioTheme(): PortfolioThemeValue {
  const ctx = useContext(PortfolioThemeContext);
  if (!ctx) {
    throw new Error('usePortfolioTheme must be used within PortfolioThemeProvider');
  }
  return ctx;
}
