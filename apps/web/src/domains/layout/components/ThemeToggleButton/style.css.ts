import { recipe } from '@vanilla-extract/recipes';

export const themeWrapper = recipe({
  base: {
    display: 'none',

    lineHeight: '0',
  },

  variants: {
    mode: {
      light: {
        selectors: {
          '.light &': {
            display: 'block',
          },
        },
      },

      dark: {
        selectors: {
          '.dark &': {
            display: 'block',
          },
        },
      },
    },
  },
});
