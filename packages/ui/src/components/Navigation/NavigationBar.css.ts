import { createContainer } from '@vanilla-extract/css';

import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const navigationBarContainer = createContainer();

export const navigationBar = recipeWithLayer({
  base: {
    zIndex: '20',
    position: 'sticky',
    top: '0',

    width: '100%',
    borderBottom: `1px solid rgb(${theme.color['border.weak']})`,

    backgroundColor: `rgba(${theme.color.background}, 0.75)`,
    backdropFilter: 'blur(2rem) saturate(150%)',

    color: `rgb(${theme.color.border})`,

    transition: 'border-bottom-color 0.2s ease',

    containerType: 'inline-size',
    containerName: navigationBarContainer,
  },
  variants: {
    size: {
      sm: {
        height: '4em',
      },

      md: {
        height: '5em',
      },

      lg: {
        height: '6em',
      },
    },
  },
});
