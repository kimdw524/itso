import { keyframes, style } from '@vanilla-extract/css';

import { fadeIn } from '@/styles/keyframes.css';

export const container = style({
  position: 'absolute',
  left: '50%',
  top: '50%',

  textAlign: 'center',

  transform: 'translate(-50%, -50%)',
  animation: `${fadeIn} 0.5s ease`,
});

const animation = keyframes({
  from: {
    transform: 'scale(1) translateY(25%)',
  },

  to: {
    transform: 'scale(1.2)  translateY(0)',
  },
});

export const icon = style({
  fontSize: '2rem',

  animation: `${animation} 1.5s ease infinite alternate`,
});
