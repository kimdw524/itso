import { recipeWithLayer } from '#styleUtils';
import { typography } from '#tokens';

export const select = recipeWithLayer({
  base: {
    position: 'relative',
  },

  variants: {
    size: {
      sm: {
        fontSize: typography.size.sm,
      },
      md: {
        fontSize: typography.size.md,
      },
      lg: {
        fontSize: typography.size.lg,
      },
    },
  },
});
