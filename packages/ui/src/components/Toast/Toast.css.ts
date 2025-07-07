import { createVar, keyframes } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { semanticColor } from '#tokens';

const colorVar = createVar();
const foregroundVar = createVar();

const semanticColors = semanticColor.reduce(
  (prev, color) => ({
    ...prev,
    [color]: styleWithLayer({
      vars: {
        [colorVar]: theme.color[color],
        [foregroundVar]: theme.color[`${color}-foreground`],
      },
    }),
  }),
  {} as Record<(typeof semanticColor)[number], string>,
);

const fill = keyframes({
  '0%': {
    transform: 'scaleX(0)',
  },
  '100%': {
    transform: 'scaleX(1)',
  },
});

export const progress = recipeWithLayer({
  base: {
    position: 'absolute',
    inset: '0',

    width: '100%',

    backgroundColor: `rgba(${foregroundVar}, 0.25)`,

    transformOrigin: '0 0',
  },

  variants: {
    animation: {
      true: {
        animationName: fill,
        animationTimingFunction: 'linear',
        animationIterationCount: '1',
        animationFillMode: 'forwards',
      },
      false: {
        display: 'none',
      },
    },
  },
});

export const toast = recipeWithLayer({
  base: {
    position: 'relative',
    overflow: 'hidden',

    padding: '0.875em',

    backgroundColor: `rgb(${colorVar})`,

    color: `rgb(${foregroundVar})`,
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',

    cursor: 'pointer',
  },
  variants: {
    color: {
      ...semanticColors,
    },
  },
});
