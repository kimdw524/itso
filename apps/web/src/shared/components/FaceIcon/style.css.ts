import { keyframes, style } from '@vanilla-extract/css';

const animation = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },

  to: {
    transform: 'rotate(30deg)',
  },
});

export const icon = style({
  animation: `${animation} 1.5s ease infinite alternate`,
});
