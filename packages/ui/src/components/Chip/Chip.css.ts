import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const chip = recipeWithLayer({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: '0',
    gap: '0.125em',

    transition: 'all 0.2s ease',

    userSelect: 'none',
  },

  variants: {
    size: {
      sm: {
        height: '1.5em',
        padding: '0 0.5em',
        borderRadius: `calc(${theme.borderRadius} * 0.75)`,

        fontSize: '0.75em',
      },

      md: {
        height: '1.875em',
        padding: '0 0.75em',
        borderRadius: theme.borderRadius,

        fontSize: '0.875em',
      },

      lg: {
        height: '2.25em',
        padding: '0 0.875em',
        borderRadius: `calc(${theme.borderRadius} * 1.25)`,

        fontSize: '1em',
      },
    },
  },
});
