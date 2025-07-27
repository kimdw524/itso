import { recipe } from '@vanilla-extract/recipes';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

export const container = recipe({
  base: {
    position: 'sticky',
    zIndex: '10',

    padding: `${spacing['3xl']} 0`,
  },
  variants: {
    isPinned: {
      true: {
        backgroundColor: `rgb(${theme.color.background})`,
      },

      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});
