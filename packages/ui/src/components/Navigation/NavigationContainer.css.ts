import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5em',

  height: '100%',
  margin: '0 auto',
});
