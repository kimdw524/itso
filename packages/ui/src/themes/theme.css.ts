import { createThemeContract } from '@vanilla-extract/css';

import { semanticColor } from '#tokens';

import { lightColor } from '../tokens/scale/color';

const semanticColors = semanticColor.reduce(
  (prev, current) => ({
    ...prev,
    [current]: null,
    [`${current}-foreground`]: null,
  }),
  {},
) as Record<
  | (typeof semanticColor)[number]
  | `${(typeof semanticColor)[number]}-foreground`,
  null
>;

export const theme = createThemeContract({
  borderRadius: null,
  color: {
    background: null,
    foreground: null,
    border: null,
    'border.weak': null,
    'card.gradient': null,
    shadow: null,
    ...semanticColors,
    ...lightColor,
  },
});
