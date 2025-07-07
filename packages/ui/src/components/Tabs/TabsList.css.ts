import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const container = styleWithLayer({
  display: 'flex',

  height: '2.5em',

  boxShadow: `inset 0 -0.125em 0 rgb(${theme.color.muted})`,
  backgroundColor: `rgb(${theme.color.background})`,
});
