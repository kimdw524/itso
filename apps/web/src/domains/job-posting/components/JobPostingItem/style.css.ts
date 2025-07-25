import { globalStyle, style } from '@vanilla-extract/css';

import { fadeIn } from '@/styles/keyframes.css';

export const container = style({
  cursor: 'pointer',

  ':hover': {
    transform: 'translateY(-0.5rem)',
  },
});

globalStyle(`${container} > *`, {
  animation: `${fadeIn} 0.3s linear`,
});
