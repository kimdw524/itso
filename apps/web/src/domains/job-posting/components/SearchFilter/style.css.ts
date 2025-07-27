import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

import { STYLE_VARS } from '@/styles/vars.css';

export const container = style({
  position: 'sticky',
  top: STYLE_VARS.STICKY_JOB_POSTING_FILTER_TOP,
  zIndex: '10',

  padding: `${spacing['3xl']} 0`,

  backgroundColor: `rgb(${theme.color.background})`,
});
