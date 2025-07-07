import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const container = styleWithLayer({});

export const close = styleWithLayer({
  width: '1.25rem',
  height: '1.25rem',
  padding: '0',
  border: '0',

  backgroundColor: 'transparent',

  fontSize: '1em',
  color: `rgb(${theme.color['muted-foreground']})`,

  cursor: 'pointer',

  transition: 'all 0.1s ease',

  ':hover': {
    color: `rgb(${theme.color['foreground']})`,
  },
});
