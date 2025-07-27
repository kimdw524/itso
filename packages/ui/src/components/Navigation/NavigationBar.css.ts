import { createContainer } from '@vanilla-extract/css';

import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { color } from '#tokens';

export const navigationBarContainer = createContainer();

export const navigationBar = recipeWithLayer({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5em',
    zIndex: '20',
    position: 'sticky',
    top: '0',

    width: '100%',
    borderBottom: '1px solid #000',

    backgroundColor: `rgba(${(theme.color.background, 0.5)})`,
    backdropFilter: 'blur(2rem) brightness(50%) saturate(50%)',

    color: `rgb(${theme.color.foreground})`,

    transition: 'border-bottom-color 0.2s ease',

    containerType: 'inline-size',
    containerName: navigationBarContainer,
  },
  variants: {
    size: {
      sm: {
        height: '4em',
        padding: '0 0.75em',
      },

      md: {
        height: '5em',
        padding: '0 1em',
      },

      lg: {
        height: '6em',
        padding: '0 1.25em',
      },
    },
  },
});
