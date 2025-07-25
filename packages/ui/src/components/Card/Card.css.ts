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
    overflow: 'hidden',
    position: 'relative',

    borderRadius: theme.borderRadius,

    color: `rgb(${theme.color.foreground})`,

    transition: 'border-color 0.2s ease',

    selectors: {
      [`&:has(${cardInteraction}:hover)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 10%, rgb(${theme.color.border}) 90%)`,
      },

      [`&:has(${cardInteraction}:active)`]: {
        borderColor: `color-mix(in srgb, rgb(${theme.color.primary}) 40%, rgb(${theme.color.border}) 60%)`,
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

      glass: {
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '0.75rem',

        background:
          'linear-gradient(rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(1rem)',

        transition: 'all 0.4s ease',

        '::before': {
          position: 'absolute',
          inset: '0',

          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',

          opacity: '0',
          transition: 'all 0.3s ease',

          content: '',
        },

        selectors: {
          '&:hover::before': {
            opacity: '1',
          },
        },
      },
    },

    color: {
      ...semanticColors,
      ...scaleColors,
    },
  },
});
