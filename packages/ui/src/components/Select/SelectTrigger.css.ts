import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { theme } from '#themes';

export const children = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const icon = recipe({
  base: {
    flexShrink: '0',

    lineHeight: '0',

    transition: 'color 0.2s ease, transform 0.2s ease',
  },

  variants: {
    isActive: {
      false: {
        transform: 'rotate(0)',
      },
      true: {
        color: `rgb(${theme.color.primary})`,

        transform: 'rotate(-180deg)',
      },
    },
  },
});

export const selectTrigger = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
    justifyContent: 'space-between',

    width: '100%',

    transition: 'border-color 0.2s ease',

    cursor: 'pointer',
    userSelect: 'none',
  },

  variants: {
    isActive: {
      true: {
        borderColor: `rgb(${theme.color.primary})`,
      },
    },
    variant: {
      contained: {
        padding: '0.75em 0.75em',
        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.secondary})`,
      },
      outlined: {
        padding: '0.75em 0.5em',
        border: '1px solid',
        borderColor: `rgb(${theme.color.border})`,
        borderRadius: theme.borderRadius,

        backgroundColor: `rgb(${theme.color.background})`,
      },
    },
  },
});
