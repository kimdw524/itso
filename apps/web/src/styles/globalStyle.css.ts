import { fontFace, globalStyle } from '@vanilla-extract/css';

const pretendard = fontFace({
  src: 'url("/fonts/PretendardVariable.woff2")',
});

globalStyle('*', {
  fontFamily: pretendard,
});

globalStyle('body', {
  display: 'grid',
  gridTemplateRows: 'auto 1fr',

  height: '100vh',
});

globalStyle('main', {
  overflow: 'auto',
});
