import { recipeWithLayer } from '#styleUtils';

export const typography = recipeWithLayer({
  base: {
    margin: '0',
  },
  variants: {
    isEllipsis: {
      true: {
        overflow: 'hidden',

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
});
