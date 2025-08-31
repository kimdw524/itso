import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing } from '#tokens';

import { narrow } from './NavigationDrawer.css';

export const navigationMenu = styleWithLayer({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',

  selectors: {
    [`${narrow} &`]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0',

      width: '100%',
      borderTop: `1px solid rgb(${theme.color['border.weak']})`,
      paddingTop: spacing['md'],
    },
  },
});
