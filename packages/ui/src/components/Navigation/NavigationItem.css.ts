import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing, typography } from '#tokens';

import { narrow } from './NavigationDrawer.css';

export const container = recipeWithLayer({
  base: {
    position: 'relative',

    lineHeight: '0',
    padding: spacing.lg,

    fontSize: '0.9375em',
    fontWeight: typography.weight.semiBold,

    transition: 'color 0.2s ease',

    cursor: 'pointer',

    ':hover': {
      color: `rgb(${theme.color.foreground})`,
    },

    selectors: {
      [`${narrow} &`]: {
        padding: `${spacing['2xl']} ${spacing.lg}`,

        fontSize: '1.125em',
      },
    },
  },
  variants: {
    isSelected: {
      true: {
        color: `rgb(${theme.color['secondary-foreground']})`,
      },
      false: {
        color: `rgba(${theme.color['secondary-foreground']}, 0.5)`,
      },
    },
  },
});
