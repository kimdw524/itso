import { style } from '@vanilla-extract/css';

import { breakpoint } from '@repo/ui/tokens';

export const content = style({
  overflowY: 'scroll',
});

export const description = style({
  overflowY: 'visible',

  '@media': {
    [`(min-width: ${breakpoint.desktop}px)`]: {
      overflowY: 'scroll',
    },
  },
});
