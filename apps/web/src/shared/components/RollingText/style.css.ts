import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100%',
});

export const item = style({
  position: 'absolute',

  top: '50%',
  left: 0,

  transform: 'translateY(-50%)',
});
