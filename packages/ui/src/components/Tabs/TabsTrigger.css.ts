import { recipeWithLayer } from '#styleUtils';
import { theme } from '#themes';

export const container = recipeWithLayer({
  base: {
    overflow: 'hidden',

    height: '100%',
    padding: '0 0.75em',
    border: '0',
    borderBottom: `0.125rem solid`,

    backgroundColor: 'transparent',

    fontSize: '1em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    transition: 'all 0.15s ease',

    cursor: 'pointer',
  },

  variants: {
    isSelected: {
      true: {
        borderBottomColor: `rgb(${theme.color.foreground})`,

        color: `rgb(${theme.color.foreground})`,
      },
      false: {
        borderBottomColor: 'transparent',

        color: `rgb(${theme.color['muted-foreground']})`,
      },
    },
  },
});
