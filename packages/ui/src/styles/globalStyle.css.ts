import { assignVars, globalStyle } from '@vanilla-extract/css';

import { darkThemeVars, lightThemeVars, theme } from '#themes';

globalStyle('*', {
  boxSizing: 'border-box',

  overscrollBehavior: 'none',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('.light', {
  vars: assignVars(theme, lightThemeVars),
});

globalStyle('.dark', {
  vars: assignVars(theme, darkThemeVars),
});

globalStyle('body', {
  margin: '0',

  backgroundColor: `rgb(${theme.color.background})`,

  lineHeight: '1',
  color: `rgb(${theme.color.foreground})`,
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle('svg', {
  lineHeight: '0',
});
