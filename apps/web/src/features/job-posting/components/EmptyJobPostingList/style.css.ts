import { style } from '@vanilla-extract/css';

import { fadeIn } from '@/styles/keyframes.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '50vh',

  animation: `${fadeIn} 0.5s ease`,
});
