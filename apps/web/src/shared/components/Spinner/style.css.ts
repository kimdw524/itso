import { theme } from '@kimdw-rtk/ui/theme';
import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const sizeVar = createVar();

export const spinner = recipe({
  base: {
    width: sizeVar,
    height: sizeVar,

    border: `calc(${sizeVar} / 12) solid rgb(${theme.color.muted})`,
    borderTop: `calc(${sizeVar} / 12) solid rgb(${theme.color.primary})`,
    borderRadius: '50%',

    animation: `${spin} 1.25s linear infinite`,
  },
  variants: {
    size: {
      xs: {
        vars: {
          [sizeVar]: '1em',
        },
      },
      sm: {
        vars: {
          [sizeVar]: '1.5em',
        },
      },
      md: {
        vars: {
          [sizeVar]: '2em',
        },
      },
      lg: {
        vars: {
          [sizeVar]: '3em',
        },
      },
    },
  },
});

export const container = style({
  position: 'absolute',
  inset: '0',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
