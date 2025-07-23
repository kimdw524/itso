import { fontFace, globalStyle } from '@vanilla-extract/css';

const pretendard = fontFace({
  src: 'url("/fonts/PretendardVariable.woff2")',
});

globalStyle('*', {
  fontFamily: pretendard,
});

globalStyle('main', {
  margin: '0 auto',
  width: '100%',
  maxWidth: '1440px',
});
