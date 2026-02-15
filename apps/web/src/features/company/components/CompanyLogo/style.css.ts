import { style } from '@vanilla-extract/css';

export const frame = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
  overflow: 'hidden',
  aspectRatio: '1 / 1',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});
