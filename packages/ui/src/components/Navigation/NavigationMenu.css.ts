import { styleWithLayer } from '#styleUtils';

import { narrow, wide } from './NavigationDrawer.css';

export const navigationMenu = styleWithLayer({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',

  selectors: {
    [`${wide} &`]: {
      position: 'absolute',
      left: '50%',

      transform: 'translateX(-50%)',
    },

    [`${narrow} &`]: {
      flexDirection: 'column',
      gap: '1em',
    },
  },
});
