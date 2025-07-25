import { recipe } from '@vanilla-extract/recipes';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

export const container = recipe({
  base: {
    position: 'sticky',
    zIndex: '10',

    padding: `${spacing['2xl']} 0`,

    backgroundColor: `rgb(${theme.color.background})`,

    '::after': {
      position: 'absolute',
      right: '0',
      bottom: '-1.5em',
      left: '0',

      height: '1.5em',
      background: `linear-gradient(to bottom, rgb(${theme.color.background}), transparent)`,

      transition: 'opacity 0.2s ease',

      content: '',
    },
  },
  variants: {
    isPinned: {
      true: {
        '::after': {
          opacity: '1',
        },
      },

      false: {
        '::after': {
          opacity: '0',
        },
      },
    },
  },
});
