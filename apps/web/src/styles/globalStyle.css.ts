import { fontFace, globalStyle } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';

import { STYLE } from '@/constants/style';

const pretendard = fontFace({
  src: 'url("/fonts/PretendardVariable.woff2")',
});

globalStyle('*', {
  fontFamily: pretendard,
});

globalStyle('main', {
  margin: '0 auto',
  width: '100%',
  maxWidth: STYLE.CONTAINER_WIDTH,
});

globalStyle('*::-webkit-scrollbar', {
  width: '0.5rem',
  height: '0.5rem',
});

globalStyle('*::-webkit-scrollbar-thumb', {
  backgroundColor: `rgba(${theme.color.accent}, 0.66)`,
  borderRadius: theme.borderRadius,
});
globalStyle('*::-webkit-scrollbar-thumb:active', {
  backgroundColor: `rgb(${theme.color.accent})`,
});

globalStyle('*::-webkit-scrollbar-track', {
  background: 'transparent',
});
