import { cloneElement, type ReactElement } from 'react';

import { darkOnly, lightOnly } from './style.css';

interface ThemeOnlyProps {
  theme: 'light' | 'dark';
  children: ReactElement<{ className?: string }>;
}

export default function ThemeOnly({ theme, children }: ThemeOnlyProps) {
  return cloneElement(children, {
    className: theme === 'dark' ? darkOnly : lightOnly,
  });
}
