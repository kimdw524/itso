import { theme } from '@kimdw-rtk/ui/theme';
import { spacing } from '@kimdw-rtk/ui/token';
import { style } from '@vanilla-extract/css';

import { searchResultHeight } from '../SearchField/style.css';

export const container = style({
  position: 'relative',
  overflowY: 'scroll',
  overscrollBehavior: 'contain',
  scrollbarWidth: 'none',

  width: '100%',
  height: searchResultHeight,

  backgroundColor: `rgb(${theme.color.background})`,
});

export const section = style({
  position: 'sticky',
  top: '0',

  backgroundColor: 'inherit',

  cursor: 'default',
});

export const item = style({
  padding: spacing.lg,

  transition: 'background-color 0.1s ease',

  cursor: 'pointer',

  ':hover': {
    backgroundColor: `rgb(${theme.color.accent})`,
  },
});
