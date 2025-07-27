import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

export const container = style({
  padding: `${spacing['xl']} ${spacing['lg']}`,
  borderBottom: `1px solid rgb(${theme.color.border})`,

  backgroundColor: `rgb(${theme.color.background})`,
});

export const logo = style({
  marginBottom: '1.5em',
  height: '2em',
});
