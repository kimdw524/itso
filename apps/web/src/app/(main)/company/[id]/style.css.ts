import { breakpoint } from '@kimdw-rtk/ui/token';
import { style } from '@vanilla-extract/css';

export const content = style({
  overflowY: 'scroll',
});

export const description = style({
  overflowY: 'visible',

  '@media': {
    [`(min-width: ${breakpoint.desktop})`]: {
      overflowY: 'scroll',
    },
  },
});
