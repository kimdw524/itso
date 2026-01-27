'use client';

import { useTheme } from 'next-themes';

import { Button } from '@kimdw-rtk/ui';
import { MoonIcon, SunIcon } from 'lucide-react';

import ThemeOnly from '../ThemeOnly';

export const ThemeToggleButton = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      color="secondary"
      size="icon-md"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <div>
        <ThemeOnly theme="light">
          <SunIcon />
        </ThemeOnly>
        <ThemeOnly theme="dark">
          <MoonIcon />
        </ThemeOnly>
      </div>
    </Button>
  );
};
