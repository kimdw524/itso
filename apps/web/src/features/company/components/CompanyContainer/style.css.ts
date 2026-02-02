import { theme } from '@kimdw-rtk/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({});

globalStyle(`${container} > *:not(:last-child)`, {
  borderBottom: `1px solid rgb(${theme.color['border.weak']})`,
});
