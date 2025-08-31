import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing, typography } from '#tokens';

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
