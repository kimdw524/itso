import { createVar, globalStyle, keyframes, style } from '@vanilla-extract/css';

import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { semanticColor } from '#tokens';

import { SCALE_COLOR, type ScaleColor } from '../../tokens/scale/color';

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

const scaleColors = SCALE_COLOR.reduce(
  (prev, value) => ({
    ...prev,
    [value]: styleWithLayer({
      vars: {
        [backgroundVar]: theme.color[value][500],
        [foregroundVar]: theme.color.background,
      },
    }),
  }),
  {} as Record<ScaleColor, string>,
);

const pulse = keyframes({
  '0%': {
    backgroundPosition: '-300% 0',
  },

  '100%': {
    backgroundPosition: '300% 0',
  },
});

export const span = recipeWithLayer({
  base: {
    lineHeight: '0',
  },
  variants: {
    size: {
      sm: {
        fontSize: '0.875em',
      },

      md: {
        fontSize: '1em',
      },

      lg: {
        fontSize: '1.125em',
      },

      'icon-sm': {
        fontSize: '1em',
      },

      'icon-md': {
        fontSize: '1.25em',
      },

      'icon-lg': {
        fontSize: '1.5em',
      },
    },
  },
});

export const button = recipeWithLayer({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',

    border: '0',
    borderRadius: theme.borderRadius,

    fontSize: '1em',

    transition: 'all 0.2s ease',

    cursor: 'pointer',
    userSelect: 'none',
  },

  variants: {
    hasIcon: {
      true: {
        gap: '0.5em',
      },
    },

    color: {
      ...semanticColors,
      ...scaleColors,
    },

    size: {
      sm: {
        height: '2.25em',
        padding: '0 0.75em',
      },

      md: {
        height: '2.5em',
        padding: '0 0.875em',
      },

      lg: {
        height: '2.75em',
        padding: '0 1em',
      },

      'icon-sm': {
        width: '2em',
        height: '2em',
      },

      'icon-md': {
        width: '2.5em',
        height: '2.5em',
      },

      'icon-lg': {
        width: '2.75em',
        height: '2.75em',
      },
    },

    variant: {
      contained: {
        boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.08)`,
        backgroundColor: `rgb(${backgroundVar})`,
        color: `rgb(${foregroundVar})`,

        ':disabled': {
          backgroundColor: `rgb(${theme.color.muted})`,

          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },

      outlined: {
        boxShadow: `inset 0 0 0 1px rgb(${backgroundVar})`,
        backgroundColor: `rgb(${theme.color.background})`,
        color: `rgb(${theme.color.foreground})`,

        ':disabled': {
          backgroundColor: `rgb(${theme.color.muted})`,

          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },

      ghost: {
        background: 'transparent',

        color: `rgb(${theme.color.foreground})`,

        ':hover': {
          backgroundColor: `rgba(${backgroundVar}, 0.8)`,

          color: `rgb(${foregroundVar})`,
        },

        ':disabled': {
          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },

      glass: {
        boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.08)`,
        backgroundColor: `rgba(${backgroundVar}, 0.75)`,
        backdropFilter: 'blur(1rem)',

        color: `rgb(${theme.color.foreground})`,

        ':disabled': {
          backgroundColor: `rgb(${theme.color.muted})`,

          color: `rgb(${theme.color['muted-foreground']})`,

          cursor: 'default',
        },
      },
    },

    pulse: {
      true: {
        '::after': {
          content: '',
          position: 'absolute',
          inset: '0',

          background:
            'linear-gradient(90deg, transparent 30%, #ffffff33 65%, transparent 100%)',
          backgroundSize: '300% 100%',

          animation: `${pulse} 5s linear 0s infinite`,
        },
      },
    },
  },
});

export const icon = style({
  lineHeight: '0',
});

globalStyle(`${icon} > *`, {
  width: '1em',
  height: '1em',
  lineHeight: '0',

  pointerEvents: 'none',
});

globalStyle(`${button.classNames.base} svg`, {
  width: '1em',
  height: '1em',
});
