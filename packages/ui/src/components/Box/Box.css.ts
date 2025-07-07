import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const box = recipeWithLayer({
  variants: {
    flex: {
      true: {
        display: 'flex',
      },
    },

    rounded: {
      true: {
        borderRadius: theme.borderRadius,
      },
    },
  },
});
