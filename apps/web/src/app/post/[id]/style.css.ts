import { style } from '@vanilla-extract/css';

import { breakpoint } from '@repo/ui/tokens';

import { STYLE } from '@/constants/style';

export const container = style({
  display: 'flex',
  flexDirection: 'column',

  height: `calc(100vh - ${STYLE.NAVBAR_HEIGHT})`,
});

export const fullContainer = style({
  display: 'flex',
  flexDirection: 'column',

  height: '100vh',
});

export const content = style({
  flex: '1 1 auto',
  overflowY: 'scroll',

  '@media': {
    [`(min-width: ${breakpoint.desktop}px)`]: {
      overflowY: 'hidden',
    },
  },
});

export const description = style({
  overflowY: 'visible',

  '@media': {
    [`(min-width: ${breakpoint.desktop}px)`]: {
      overflowY: 'scroll',
    },
  },
});
