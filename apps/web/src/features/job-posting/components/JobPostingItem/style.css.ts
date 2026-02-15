import { theme } from '@kimdw-rtk/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

import { fadeIn } from '@/styles/keyframes.css';

export const container = style({
  overflow: 'clip',
  border: `1px solid rgb(${theme.color['border.weak']})`,

  background: `linear-gradient(
  color-mix(in srgb, rgb(${theme.color.background}) 94%, rgb(${theme.color['card.gradient']}) 6%) 0%,
  color-mix(in srgb, rgb(${theme.color.background}) 98%, rgb(${theme.color['card.gradient']}) 2%) 100%
  )`,

  cursor: 'pointer',

  ':hover': {
    transform: 'translateY(-0.5rem)',
  },
});

export const bookmarkButton = style({
  position: 'absolute',
  top: '0.75em',
  right: '0.75em',
});

globalStyle(`${container} > *`, {
  animation: `${fadeIn} 0.3s linear`,
});
