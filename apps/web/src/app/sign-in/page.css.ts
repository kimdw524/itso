import { keyframes, style } from '@vanilla-extract/css';

import { fadeIn } from '@/styles/keyframes.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',

  animation: `${fadeIn} 0.5s ease`,
});

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
