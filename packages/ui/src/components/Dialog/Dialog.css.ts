import { style } from '@vanilla-extract/css';

import { theme } from '#themes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',

  maxWidth: 'calc(100vw - 2rem)',
  minWidth: 'min(20rem, calc(100vw - 2rem))',
  padding: '1rem',
  borderRadius: theme.borderRadius,
  boxSizing: 'border-box',

  backgroundColor: `rgb(${theme.color.background})`,

  userSelect: 'none',
});

export const message = style({
  marginBottom: '1rem',

  lineHeight: '150%',
  wordBreak: 'break-all',
});
