import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoint } from '@repo/ui/tokens';

export const container = style({});

globalStyle(`${container} > *`, {
  width: '260px',

  '@media': {
    [`(min-width: ${breakpoint.desktop}px)`]: {
      width: '300px',
    },
  },
});
