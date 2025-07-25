import { keyframes } from '@vanilla-extract/css';

import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '-300% 0',
  },

  '100%': {
    backgroundPosition: '300% 0',
  },
});

export const skeleton = styleWithLayer({
  display: 'block',

  maxWidth: '100%',
  borderRadius: theme.borderRadius,

  background: `linear-gradient(90deg, rgba(${theme.color.accent}, 0.4) 30%, rgba(${theme.color.accent}, 0.2) 65%, rgba(${theme.color.accent}, 0.4))`,
  backgroundSize: '300% 100%',

  animation: `${shimmer} 5s linear 0s infinite`,
});
