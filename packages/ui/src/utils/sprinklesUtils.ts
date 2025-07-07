import { sprinkles } from '#styles';

type SprinklesKey = typeof sprinkles.properties extends Set<infer U> ? U : never;

export const filterSprinkles = (props: { [key: string]: unknown }) => {
  const result = {} as { [key in SprinklesKey]: unknown };

  for (const key in props) {
    if (sprinkles.properties.has(key as SprinklesKey)) {
      result[key as SprinklesKey] = props[key];
    }
  }

  return result as Parameters<typeof sprinkles>[0];
};

export const omitSprinkles = (props: { [key: string]: unknown }) => {
  const result = {} as { [key: string]: unknown };

  for (const key in props) {
    if (!sprinkles.properties.has(key as SprinklesKey)) {
      result[key as SprinklesKey] = props[key];
    }
  }

  return result;
};
