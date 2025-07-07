import { globalStyle, style } from '@vanilla-extract/css';

export const enter = style({
  opacity: '1 !important',
  transition: 'all 0.2s ease',
});

export const base = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  inset: '0',
  zIndex: '100',

  backgroundColor: '#00000080',

  opacity: '0',
});

export const exit = style({
  opacity: '0 !important',
  transition: 'all 0.2s ease',

  pointerEvents: 'none',
});

globalStyle(`${enter} > div`, {
  transform: 'scale(1) !important',
  transition: 'all 0.2s ease',
});

globalStyle(`${base} > div`, {
  transform: 'scale(0.9)',
});

globalStyle(`${exit} > div`, {
  transform: 'scale(0.9) !important',
  transition: 'all 0.2s ease',
});
