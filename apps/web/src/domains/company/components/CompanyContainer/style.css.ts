import { globalStyle, style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';

export const container = style({});

globalStyle(`${container} > *:not(:last-child)`, {
  borderBottom: `1px solid rgb(${theme.color['border.weak']})`,
});
