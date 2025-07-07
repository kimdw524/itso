import { styleWithLayer } from '#styleUtils';
import { theme } from '#themes';

import * as header from './DialogHeader.css';

export const container = styleWithLayer({
  wordBreak: 'break-all',

  selectors: {
    [`${header.container} + &`]: {
      color: `rgb(${theme.color['muted-foreground']})`,
    },
  },
});
