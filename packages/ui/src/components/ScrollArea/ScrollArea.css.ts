import { style } from '@vanilla-extract/css';

import { styleWithLayer } from '#styleUtils';

const MASK_SIZE = '3rem';

export const scrollArea = styleWithLayer({
  width: '100%',
  overflowX: 'scroll',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const maskLeft = style({
  maskImage: `linear-gradient(to left,
  black 0%,
  black calc(100% - ${MASK_SIZE}),
  transparent 100%)`,
});

export const maskRight = style({
  maskImage: `linear-gradient(to right,
  black 0%,
  black calc(100% - ${MASK_SIZE}),
  transparent 100%)`,
});

export const maskBoth = style({
  maskImage: `linear-gradient(to right,
  transparent 0%,
  black ${MASK_SIZE},
  black calc(100% - ${MASK_SIZE}),
  transparent 100%)`,
});

export const wrapper = style({
  width: 'max-content',
});
