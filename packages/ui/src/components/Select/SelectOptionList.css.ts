import { keyframes } from '@vanilla-extract/css';

import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';

const fadeIn = keyframes({
  '0%': {
    transform: 'scale(0.95)',
    opacity: 0,
  },

  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
});

export const container = recipeWithLayer({
  base: {
    overflowY: 'auto',
    position: 'absolute',
    zIndex: '10',

    width: '100%',
    border: `1px solid rgb(${theme.color.border})`,
    borderRadius: theme.borderRadius,
    margin: '0.5rem 0',

    backgroundColor: `rgb(${theme.color.background})`,

    animation: `${fadeIn} 0.3s ease 1`,
    transformOrigin: '0 0',

    userSelect: 'none',

    '::-webkit-scrollbar': {
      width: '0.25rem',
      height: '0.25rem',
    },

    '::-webkit-scrollbar-thumb': {
      borderRadius: '0.5rem',

      backgroundColor: `rgb(${theme.color['muted-foreground']})`,
    },
  },

  variants: {
    isVisible: {
      true: {
        display: 'block',
      },
      false: {
        display: 'none',
      },
    },

    isAbove: {
      true: {
        top: '100%',
      },
      false: {
        bottom: '100%',
      },
    },
  },
});
