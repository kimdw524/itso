import { theme } from '@kimdw-rtk/ui/theme';
import { style } from '@vanilla-extract/css';

export const frame = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
  overflow: 'hidden',
  aspectRatio: '1 / 1',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const empty = style({
  width: '3rem !important',
  height: '3rem !important',

  borderRadius: theme.borderRadius,
  backgroundColor: `rgb(${theme.color.muted})`,
});
