import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';
import { spacing, typography } from '#tokens';

import { navigationMenu } from './NavigationMenu.css';

export const container = styleWithLayer({
  position: 'relative',

  lineHeight: '0',
  padding: spacing.lg,

  color: `rgb(${theme.color['secondary-foreground']})`,
  fontSize: '0.9375em',
  fontWeight: typography.weight.semiBold,

  transition: 'all 0.2s ease',

  cursor: 'pointer',

  ':hover': {
    color: `rgb(${theme.color.foreground}) !important`,
  },

  selectors: {
    [`${navigationMenu}:hover &`]: {
      color: `rgba(${theme.color['secondary-foreground']}, 0.33)`,
    },
  },
});
