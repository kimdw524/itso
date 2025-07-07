import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { color, semanticColor } from '#tokens';

import { cardInteraction } from './CardInteraction.css';

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithLayer({
      backgroundColor: `rgb(${theme.color[color]})`,
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const scaleColors = Object.entries(color).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: styleWithLayer({
      backgroundColor: `color-mix(in srgb, rgb(${value[500]}) 20%, rgb(${theme.color.background}) 80%)`,
    }),
  }),
  {} as Record<keyof typeof color, string>,
);

export const card = recipeWithLayer({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    borderRadius: theme.borderRadius,

    color: `rgb(${theme.color.foreground})`,

    transition: 'border-color 0.2s ease',

    selectors: {
      [`&:has(${cardInteraction}:hover)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 30%, rgb(${theme.color.border}) 70%)`,
      },

      [`&:has(${cardInteraction}:active)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 60%, rgb(${theme.color.border}) 40%)`,
      },
    },
  },
  variants: {
    variant: {
      contained: {},

      outlined: {
        border: '1px solid',
        borderColor: `rgb(${theme.color.border})`,
      },
    },

    color: {
      ...semanticColors,
      ...scaleColors,
    },
  },
});
