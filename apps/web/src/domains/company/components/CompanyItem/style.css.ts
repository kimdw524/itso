import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';

import { fadeIn } from '@/styles/keyframes.css';

export const separator = style({
  width: '1px',
  height: '1rem',
  backgroundColor: `rgb(${theme.color.border})`,
});

export const imageContainer = style({
  lineHeight: 0,

  height: '1.5rem',
});

export const container = style({
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: `rgb(${theme.color.card})`,
  },
});

const animation = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(0.375rem)',
  },
});

export const navigation = style({
  selectors: {
    [`${container}:hover &`]: {
      animation: `${animation} 1s infinite alternate`,
    },
  },
});

globalStyle(`${container} > *`, {
  animation: `${fadeIn} 0.3s linear`,
});
