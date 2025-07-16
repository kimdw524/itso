import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from 'next-themes';
import { type ReactNode } from 'react';

interface ThemeProviderProps extends NextThemesProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
