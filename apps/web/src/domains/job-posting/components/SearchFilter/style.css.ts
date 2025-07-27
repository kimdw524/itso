import { style } from '@vanilla-extract/css';

import { theme } from '@repo/ui/themes';
import { spacing } from '@repo/ui/tokens';

import { STYLE } from '@/constants/style';

export const container = style({
  position: 'sticky',
  top: `${STYLE.STICKY.JOB_POSTING_FILTER}px`,
  zIndex: '10',

  padding: `${spacing['3xl']} 0`,

  backgroundColor: `rgb(${theme.color.background})`,
});
