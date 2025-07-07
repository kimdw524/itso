import { recipeWithLayer, styleWithLayer } from '#styleUtils';

import { paddingVar } from './Accordion.css';

export const container = recipeWithLayer({
  base: {
    overflow: 'hidden',

    transition: 'height 0.2s ease, opacity 0.2s ease',
  },

  variants: {
    isExpanded: {
      true: {
        opacity: '1',
      },

      false: {
        height: '0',

        opacity: '0',
      },
    },
  },
});

export const inner = styleWithLayer({
  padding: paddingVar,
});
