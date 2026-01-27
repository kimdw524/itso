import { breakpoint } from '@kimdw-rtk/ui';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({});

globalStyle(`${container} > *`, {
  width: '260px',

  '@media': {
    [`(min-width: ${breakpoint.desktop})`]: {
      width: '300px',
    },
  },
});
