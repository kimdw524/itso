import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { sprinklesLayer } from '#styles';
import { theme } from '#themes';
import { color, spacing, typography } from '#tokens';

type ColorName = keyof typeof color;
type ColorScale<C extends ColorName> = keyof (typeof color)[C];
type Color = Record<`${ColorName}-${ColorScale<ColorName>}`, string>;
type SemanticColor = Record<keyof typeof theme.color, string>;

const colors = Object.assign(
  {},
  ...[
    ...Object.entries(color).reduce(
      (prev, [name, scales]) => [
        ...prev,
        ...Object.entries(scales).map(([scale, value]) => ({ [`${name}-${scale}`]: `rgb(${value})` }) as Color),
      ],
      [] as Color[],
    ),
    ...Object.entries(theme.color).map(([name, value]) => ({ [name]: `rgb(${value})` }) as SemanticColor),
  ],
) as Record<keyof Color | keyof SemanticColor, string>;

export const colorProperties = defineProperties({
  '@layer': sprinklesLayer,
  properties: {
    color: colors,
    borderColor: colors,
    backgroundColor: colors,
  },
});

const size = {
  '0': '0',
  '100%': '100%',
  '5em': '5em',
  '10em': '10em',
  '15em': '15em',
  '20em': '20em',
  '25em': '25em',
};

export const boxProperties = defineProperties({
  '@layer': sprinklesLayer,
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['flex', 'block', 'none', 'inline', 'inline-block', 'inline-flex'],
    flexDirection: ['row', 'column'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse', 'revert', 'revert-layer'],
    flexShrink: {
      '0': 0,
      '1': 1,
    },
    flexGrow: {
      '0': 0,
      '1': 1,
    },
    flexBasis: size,
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    gap: spacing,
    paddingTop: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    marginTop: spacing,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    boxShadow: {
      'border-sm': `0 0 0.5rem 0.0625rem rgba(${theme.color.border}, 0.33)`,
      'border-md': `0 0 1rem 0.1875rem rgba(${theme.color.border}, 0.33)`,
      'border-lg': `0 0 1.5rem 0.375rem rgba(${theme.color.border}, 0.33)`,
      'accent-sm': `0 0 0.5rem 0.0625rem rgb(${theme.color.accent})`,
      'accent-md': `0 0 1rem 0.125rem rgb(${theme.color.accent})`,
      'accent-lg': `0 0 1.5rem 0.375rem rgb(${theme.color.accent})`,
    },
    borderRadius: {
      none: '0',
      sm: `calc(${theme.borderRadius} * 0.75)`,
      md: theme.borderRadius,
      lg: `calc(${theme.borderRadius} * 1.5)`,
    },
    width: size,
    height: size,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export const typographyProperties = defineProperties({
  '@layer': sprinklesLayer,
  properties: {
    lineHeight: typography.lineHeight,
    fontSize: typography.size,
    fontWeight: typography.weight,
  },
});

export const miscProperties = defineProperties({
  '@layer': sprinklesLayer,
  properties: {
    cursor: {
      pointer: 'pointer',
      'not-allowed': 'not-allowed',
      default: 'default',
    },
  },
});

export const sprinkles = createSprinkles(boxProperties, colorProperties, typographyProperties, miscProperties);

export type SprinklesProps = Parameters<typeof sprinkles>[0];
