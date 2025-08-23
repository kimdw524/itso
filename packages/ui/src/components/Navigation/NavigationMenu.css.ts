import { styleWithLayer } from '#styleUtils';

import { narrow } from './NavigationDrawer.css';

export const navigationMenu = styleWithLayer({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',

  selectors: {
    [`${narrow} &`]: {
      flexDirection: 'column',
      gap: '1em',
    },
  },
});
