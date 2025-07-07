import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const colorVar = createVar();

export const ripple = recipe({
  base: {
    position: 'absolute',
    left: '0',
    top: '0',

    borderRadius: '50%',

    backgroundColor: colorVar,

    opacity: '0',
    transformOrigin: 'center center',

    pointerEvents: 'none',

    vars: {
      [colorVar]: `color-mix(in srgb, rgba(${theme.color.accent}, 0.3) 80%, rgba(${theme.color.foreground}, 0.3) 20%)`,
    },
  },
  variants: {
    animation: {
      true: {
        transition: 'opacity 0.25s linear, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translate(-50%, -50%) scale(1, 1)',
      },

      false: {
        transform: 'translate(-50%, -50%) scale(0.1, 0.1)',
      },
    },
  },
});
