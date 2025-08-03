import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing } from '#tokens';

import { navigationMenu } from './NavigationMenu.css';

export const container = styleWithLayer({
  lineHeight: '0',
  padding: spacing.lg,

  color: `rgb(${theme.color.foreground})`,

  transition: 'all 0.2s ease',

  cursor: 'pointer',

  ':hover': {
    color: `rgb(${theme.color.foreground}) !important`,
  },

  selectors: {
    [`${navigationMenu}:hover &`]: {
      color: `rgba(${theme.color.foreground}, 0.5)`,
    },
  },
});
