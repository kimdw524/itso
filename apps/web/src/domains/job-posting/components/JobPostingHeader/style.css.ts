import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: spacing.xl,

  padding: `${spacing['xl']} ${spacing['lg']}`,
  borderBottom: `1px solid rgb(${theme.color['border.weak']})`,

  backgroundColor: `rgb(${theme.color.background})`,
});

export const logo = style({
  marginBottom: '1.5em',
  height: '2em',
});

export const separator = style({
  width: '1px',
  height: '1em',
  backgroundColor: `rgb(${theme.color.border})`,
});
