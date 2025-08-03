import { style } from '@vanilla-extract/css';

export const postContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.5rem',
});
