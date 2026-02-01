import { theme } from '@kimdw-rtk/ui/theme';
import { spacing } from '@kimdw-rtk/ui/token';
import { style } from '@vanilla-extract/css';

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
