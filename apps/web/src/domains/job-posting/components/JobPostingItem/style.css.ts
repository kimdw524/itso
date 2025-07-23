import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';

export const container = style({
  transition: 'all 0.1s ease',

  ':hover': {
    boxShadow: `0 0 1em 0 rgb(${theme.color.accent})`,

    transform: 'scale(1.02)',
  },
});
