import { recipe } from '@vanilla-extract/recipes';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

import { STYLE_VARS } from '@/styles/vars.css';

export const container = recipe({
  base: {
    position: 'sticky',
    top: STYLE_VARS.STICKY_JOB_POSTING_FILTER_TOP,
    zIndex: '10',

    padding: `${spacing['3xl']} 0`,

    backgroundColor: 'transparent',

    transition: 'top 1ms',

    '::after': {
      position: 'absolute',
      top: '100%',
      left: '0',

      width: '100%',
      height: '1rem',
      background: `linear-gradient(to bottom, rgba(${theme.color.shadow}, 0.5), rgba(${theme.color.shadow}, 0))`,

      opacity: '0',
      transition: 'opacity 0.2s ease',

      content: '',
    },
  },

  variants: {
    isStuck: {
      true: {
        backgroundColor: `rgb(${theme.color.background})`,

        '::after': {
          opacity: '1',
        },
      },
    },
  },
});
