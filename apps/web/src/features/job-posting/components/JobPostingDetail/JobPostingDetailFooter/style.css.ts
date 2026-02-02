import { theme } from '@kimdw-rtk/ui/theme';
import { style } from '@vanilla-extract/css';

import { STYLE_VARS } from '@/styles/vars.css';

export const wrapper = style({
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',

  borderTop: `1px solid rgb(${theme.color['border.weak']})`,

  backgroundColor: `rgb(${theme.color.background})`,

  transition: 'top 1ms !important',

  '::after': {
    position: 'absolute',
    bottom: '100%',
    left: '0',

    width: '100%',
    height: '0.75rem',
    background: `linear-gradient(to top, rgba(${theme.color.shadow}, 0.2), transparent)`,

    transition: 'opacity 0.2s ease',

    content: '',
  },
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',

  maxWidth: STYLE_VARS.CONTAINER_WIDTH,
  margin: '0 auto',
});

export const logo = style({
  height: '1.25em',
});
