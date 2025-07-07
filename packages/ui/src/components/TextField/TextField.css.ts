import { createVar } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { color, semanticColor } from '#tokens';

const backgroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithLayer({
      vars: {
        [backgroundVar]: theme.color[color],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = Object.entries(color).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: styleWithLayer({
      vars: {
        [backgroundVar]: value[500],
      },
    }),
  }),
  {} as Record<keyof typeof color, string>,
);

export const textField = recipeWithLayer({
  base: {
    padding: '0.75em 0.5em',
    border: `1px solid`,
    borderColor: ` rgb(${theme.color.border})`,

    backgroundColor: `rgb(${theme.color.background})`,

    color: `rgb(${theme.color.foreground})`,

    transition: 'all 0.15s ease',

    outline: 'none',

    ':focus': {
      borderColor: `rgb(${backgroundVar})`,
    },

    ':disabled': {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        borderRadius: theme.borderRadius,

        fontSize: '0.875em',
      },
      md: {
        borderRadius: theme.borderRadius,

        fontSize: '1em',
      },
      lg: {
        borderRadius: theme.borderRadius,

        fontSize: '1.125em',
      },
    },
  },
});
