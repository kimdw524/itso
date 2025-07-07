import { style, type StyleRule } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentsLayer } from '#styles';

type StyleRuleWithoutLayer = Omit<StyleRule, '@layer'> | string | (Omit<StyleRule, '@layer'> | string)[];
type RecipeStyleRuleWithoutLayer = Omit<StyleRule, '@layer'> | string | (Omit<StyleRule, '@layer'> | string)[];
type VariantDefinitions = Record<string, RecipeStyleRuleWithoutLayer>;
type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T;
type VariantGroups = Record<string, VariantDefinitions>;
type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]> | undefined;
};

interface CompoundVariant<Variants extends VariantGroups> {
  variants: VariantSelection<Variants>;
  style: RecipeStyleRuleWithoutLayer;
}
type PatternOptions<Variants extends VariantGroups> = {
  base?: RecipeStyleRuleWithoutLayer;
  variants?: Variants;
  defaultVariants?: VariantSelection<Variants>;
  compoundVariants?: Array<CompoundVariant<Variants>>;
};

export const styleWithLayer = (rule: StyleRuleWithoutLayer, layer: string = componentsLayer) => {
  if (Array.isArray(rule)) {
    return rule
      .map((ruleItem) => {
        if (typeof ruleItem === 'string') {
          return ruleItem;
        }
        return style({ '@layer': { [layer]: ruleItem } });
      })
      .join(' ');
  } else if (typeof rule === 'string') {
    return rule;
  }

  return style({ '@layer': { [layer]: rule } });
};

export const recipeWithLayer = <Variants extends VariantGroups>(
  options: PatternOptions<Variants>,
  layer: string = componentsLayer,
) => {
  const { base, compoundVariants, defaultVariants, variants } = options;

  let layeredBase: RecipeStyleRuleWithoutLayer | undefined;

  if (base) {
    if (typeof base === 'string') {
      layeredBase = base;
    } else if (Array.isArray(base)) {
      layeredBase = base
        .map((rule) => {
          if (typeof rule === 'string') {
            return rule;
          }

          if (Array.isArray(rule)) {
            return rule.join(' ');
          }

          return style({ '@layer': { [layer]: rule } });
        })
        .join(' ');
    } else {
      layeredBase = style({ '@layer': { [layer]: base } });
    }
  }

  let layeredVariants: Variants | undefined;

  if (variants) {
    layeredVariants = Object.entries(variants).reduce((prev, [variantKey, variantValue]) => {
      return {
        ...prev,
        [variantKey]: Object.entries(variantValue).reduce((prev, [key, value]) => {
          return { ...prev, [key]: styleWithLayer(value, layer) };
        }, {}),
      };
    }, {} as Variants);
  }

  return recipe({
    base: layeredBase,
    compoundVariants,
    defaultVariants,
    variants: layeredVariants,
  });
};
