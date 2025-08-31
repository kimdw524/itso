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
  justifyContent: 'space-between',
  gap: '0.5em',
  flexGrow: '1',

  '@container': {
    [`${navigationBarContainer} (max-width: 800px)`]: {
      display: 'none',
    },
  },
});

export const popup = recipeWithLayer({
  base: {
    position: 'absolute',
    top: '100%',
    height: 'calc(100vh - 100%)',
    left: '0',
    width: '100%',
    zIndex: '100',

    maxHeight: '100vh',
    padding: '0.75em',
    borderBottom: `1px solid rgb(${theme.color.border})`,

    backgroundColor: `rgb(${theme.color.background})`,

    transition: 'opacity 0.2s ease',
  },

  variants: {
    isVisible: {
      true: {
        opacity: '1',
      },

      false: {
        opacity: '0',

        pointerEvents: 'none',
      },
    },
  },
});
