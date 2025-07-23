import { createVar } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { color, semanticColor } from '#tokens';

const backgroundVar = createVar();
const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithLayer({
      vars: {
        [backgroundVar]: theme.color[color],
        [foregroundVar]: theme.color[`${color}-foreground`],
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
        [backgroundVar]: value[100],
        [foregroundVar]: value[900],
      },
    }),
  }),
  {} as Record<keyof typeof color, string>,
);

export const chip = recipeWithLayer({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: '0',
    gap: '0.125em',

    height: '2em',
    padding: '0 0.75em',
    borderRadius: theme.borderRadius,

    backgroundColor: `rgb(${backgroundVar})`,
    color: `rgb(${foregroundVar})`,

    transition: 'all 0.2s ease',

    userSelect: 'none',
  },

  variants: {
    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        fontSize: '0.75em',
      },

      md: {
        fontSize: '0.875em',
      },

      lg: {
        fontSize: '1em',
      },
    },
  },
});
