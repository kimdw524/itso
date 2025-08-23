import { globalStyle, style } from '@vanilla-extract/css';

export const lightOnly = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      display: 'none',
    },
  },
});

export const darkOnly = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      display: 'none',
    },
  },
});

globalStyle(`.dark ${darkOnly}`, {
  display: 'inline-block !important',
});

globalStyle(`.dark ${lightOnly}`, {
  display: 'none !important',
});

globalStyle(`.light ${lightOnly}`, {
  display: 'inline-block !important',
});

globalStyle(`.light ${darkOnly}`, {
  display: 'none !important',
});
