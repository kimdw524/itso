import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const tableHead = styleWithLayer({
  padding: '0.5em 0.625em',

  color: `rgb(${theme.color['accent-foreground']})`,
  fontSize: '0.9375em',
  fontWeight: '500',
});
