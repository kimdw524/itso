'use client';

import { useTheme } from 'next-themes';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@repo/ui';

import * as s from './style.css';

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
    >
      <div className={s.themeWrapper({ mode: 'light' })}>
        <SunIcon />
      </div>
      <div className={s.themeWrapper({ mode: 'dark' })}>
        <MoonIcon />
      </div>
    </Button>
  );
};
