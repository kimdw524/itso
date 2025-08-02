import { recipeWithLayer, styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

import { navigationBarContainer } from './NavigationBar.css';

export const narrow = styleWithLayer({
  display: 'none',

  '@container': {
    [`${navigationBarContainer} (max-width: 800px)`]: {
      display: 'block',
    },
  },
});

export const wide = styleWithLayer({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',

  '@container': {
    [`${navigationBarContainer} (max-width: 800px)`]: {
      display: 'none',
    },
  },
});

export const popup = recipeWithLayer({
  base: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '100',

    maxHeight: '100vh',
    padding: '0.75em',
    borderBottom: `1px solid rgb(${theme.color.border})`,

    backgroundColor: `rgb(${theme.color.background})`,

    transition: 'transform 0.2s ease, opacity 0.2s ease',
  },

  variants: {
    isVisible: {
      true: {
        transform: 'translateY(0)',

        opacity: '1',
      },

      false: {
        transform: 'translateY(-100%)',

        opacity: '0',

        pointerEvents: 'none',
      },
    },
  },
});
