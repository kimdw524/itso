import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';

import { STYLE_VARS } from '@/styles/vars.css';

export const container = style({
  position: 'fixed',
  top: STYLE_VARS.NAVBAR_HEIGHT,

  height: '100%',
  width: '100%',
  maxWidth: STYLE_VARS.CONTAINER_WIDTH,

  backgroundColor: `rgb(${theme.color.background})`,
});
