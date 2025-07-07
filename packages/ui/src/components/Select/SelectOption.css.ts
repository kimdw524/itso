import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const selectOption = styleWithLayer({
  padding: '0.75em 0.5em',

  transition: 'all 0.2s ease',

  cursor: 'default',

  ':hover': {
    backgroundColor: `rgb(${theme.color.accent})`,
  },
});
