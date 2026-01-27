import { theme } from '@kimdw-rtk/ui/theme';
import { style } from '@vanilla-extract/css';

import { STYLE_VARS } from '@/styles/vars.css';

export const container = style({
  position: 'fixed',
  top: STYLE_VARS.NAVBAR_HEIGHT,
  right: 0,
  bottom: 0,
  left: 0,
  overflowY: 'scroll',

  width: '100%',

  backgroundColor: `rgb(${theme.color.background})`,
});

export const inner = style({
  margin: '0 auto',
  maxWidth: STYLE_VARS.CONTAINER_WIDTH,
  width: '100%',
  height: '100%',

  backgroundColor: `rgb(${theme.color.background})`,
});
