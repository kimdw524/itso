import type { ComponentPropsWithRef, ElementType } from 'react';

import type { ComplexStyleRule } from '@vanilla-extract/css';
import type { RecipeVariants, RuntimeFn } from '@vanilla-extract/recipes';

import type { SprinklesProps } from '#styles';

type VariantGroups = Record<string, Record<string, ComplexStyleRule | string>>;

export type RecipeVariantsProps<V extends RuntimeFn<VariantGroups> | undefined> = NonNullable<
  V extends RuntimeFn<VariantGroups> ? RecipeVariants<V> : object
>;

/**
 * @template T element type
 * @template V typeof vanilla-extract recipe
 */
export type UIComponent<T extends ElementType, V extends RuntimeFn<VariantGroups> | undefined = undefined> = Omit<
  ComponentPropsWithRef<T>,
  keyof RecipeVariantsProps<V>
> &
  RecipeVariantsProps<V> & {
    sx?: SprinklesProps;
  };
