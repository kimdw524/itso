import { theme } from '@kimdw-rtk/ui/theme';
import { style } from '@vanilla-extract/css';

export const children = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const icon = style({
  flexShrink: '0',

  lineHeight: '0',
});

export const filterButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  justifyContent: 'space-between',

  width: '100%',
  padding: '0.75em 0.5em',
  border: '1px solid',
  borderColor: `rgb(${theme.color.border})`,
  borderRadius: theme.borderRadius,

  backgroundColor: `rgb(${theme.color.background})`,

  transition: 'border-color 0.2s ease',

  cursor: 'pointer',
  userSelect: 'none',

  ':hover': {
    borderColor: `rgb(${theme.color.primary})`,
  },
});
