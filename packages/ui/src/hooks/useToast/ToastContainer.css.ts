import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column-reverse',

  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  left: '1rem',
});
