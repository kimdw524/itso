import { createVar } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { semanticColor } from '#tokens';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

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

const scaleColors = SCALE_COLOR.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithLayer({
      vars: {
        [backgroundVar]: theme.color[value][100],
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

export const range = recipeWithLayer({
  base: {
    position: 'relative',

    width: '100%',
    height: '2em',

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
        fontSize: '1em',
      },

      lg: {
        fontSize: '1.25em',
      },
    },
  },
});

export const thumb = styleWithLayer({
  display: 'inline-block',
  position: 'absolute',
  top: '50%',

  width: '1.25em',
  height: '1.25em',

  borderRadius: '50%',

  boxShadow: `0 0 0.375em 0.125em rgba(${backgroundVar}, 0.33)`,
  backgroundColor: `rgb(${backgroundVar})`,

  transform: 'translate(-50%, -50%)',

  cursor: 'pointer',

  '::before': {
    position: 'absolute',
    inset: '-0.75em',

    content: '',
  },

  '::after': {
    position: 'absolute',
    inset: '0',

    borderRadius: '50%',

    boxShadow: `0 0 0.5em 0.125em rgba(${backgroundVar}, 0.5)`,

    opacity: '0',
    transition: 'opacity 0.2s ease',

    content: '',
  },

  selectors: {
    '&:hover::after': {
      opacity: '1',
    },
  },
});

export const fill = styleWithLayer({
  position: 'absolute',
  top: '0',

  height: '100%',

  backgroundColor: `rgb(${backgroundVar})`,
});

export const bar = styleWithLayer({
  position: 'absolute',
  top: '50%',

  width: '100%',
  height: '0.5em',
  borderRadius: theme.borderRadius,

  backgroundColor: `rgb(${theme.color.muted})`,

  transform: 'translateY(-50%)',
});
