import { fontFace, globalStyle } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';
import { breakpoint } from '@repo/ui/tokens';

import { STYLE_VARS } from './vars.css';

const pretendard = fontFace({
  src: 'url("/fonts/PretendardVariable.woff2")',
});

globalStyle('*', {
  fontFamily: pretendard,
});

globalStyle('body', {
  overflowY: 'scroll',

  vars: {
    [STYLE_VARS.CONTAINER_WIDTH]: '1440px',
    [STYLE_VARS.NAVBAR_HEIGHT]: '4em',
    [STYLE_VARS.STICKY_HEADER_TOP]: STYLE_VARS.NAVBAR_HEIGHT,
  },
  '@media': {
    [`(min-width: ${breakpoint.desktop}px)`]: {
      vars: {
        [STYLE_VARS.NAVBAR_HEIGHT]: '5em',
      },
    },
  },
});

globalStyle('main', {
  margin: '0 auto',
  width: '100%',
  maxWidth: STYLE_VARS.CONTAINER_WIDTH,
});

globalStyle('*::-webkit-scrollbar', {
  width: '0.25rem',
  height: '0.25rem',
});

globalStyle('*::-webkit-scrollbar-thumb', {
  backgroundColor: `rgb(${theme.color.border})`,
  borderRadius: theme.borderRadius,
});
globalStyle('*::-webkit-scrollbar-thumb:active', {
  backgroundColor: `rgb(${theme.color['border.weak']})`,
});

globalStyle('*::-webkit-scrollbar-track', {
  background: 'transparent',
});
