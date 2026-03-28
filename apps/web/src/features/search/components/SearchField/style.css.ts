import { theme } from '@kimdw-rtk/ui/theme';
import { spacing } from '@kimdw-rtk/ui/token';
import { createVar, keyframes, style } from '@vanilla-extract/css';

const rotate = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '50%': {
    backgroundPosition: '400% 0',
  },
  '100%': {
    backgroundPosition: '0 0',
  },
});

export const searchResultHeight = createVar();

export const wrapper = style({
  position: 'relative',

  width: '100%',
  maxWidth: '640px',

  marginBlock: spacing['2xl'],
  marginInline: 'auto',

  vars: {
    [searchResultHeight]: '350px',
  },
});

export const container = style({
  position: 'absolute',
  top: '0',
  left: '0',
  overflow: 'hidden',

  width: '100%',
  border: '1px solid transparent',
  borderRadius: theme.borderRadius,
  boxShadow: `0 0 1rem rgb(${theme.color.accent})`,
  background: `linear-gradient(45deg, rgb(${theme.color.primary}), rgb(${theme.color.border}), rgb(${theme.color.primary}))`,
  backgroundSize: '400%',

  animation: `${rotate} 20s linear infinite`,
  transition: 'height 0.2s ease',

  ':focus-within': {
    height: `calc(${searchResultHeight} + 3.25rem + 2px)`,
  },

  selectors: {
    '&:not(:focus-within)': {
      height: 'calc(3.25rem + 2px)',
    },

    '&::before': {
      position: 'absolute',
      inset: '0',

      borderRadius: 'inherit',
      backgroundColor: `rgb(${theme.color.background})`,

      content: '',
    },
  },
});

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.lg,

  position: 'relative',
  padding: spacing.lg,
  height: '3.25rem',
  backgroundColor: 'inherit',
  borderRadius: theme.borderRadius,

  cursor: 'text',
});

export const textContainer = style({
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  flex: '1',
});

export const textField = style({
  width: '100%',
  height: '100%',
  padding: '0',
  border: '0',
  outline: 'none',

  backgroundColor: 'transparent',

  fontSize: '1rem',
  fontWeight: '400',
});

export const placeholder = style({
  position: 'absolute',
  top: '1px',

  fontSize: '1rem',

  pointerEvents: 'none',

  selectors: {
    [`${container}:has(${textField}:not(:placeholder-shown)) &`]: {
      display: 'none',
    },
  },
});
