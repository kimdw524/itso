import {
  Serializer,
  type SearchParamsSchema,
} from '@kimdw-rtk/react-search-params';

import { objectToURLSearchParams } from './objectToURLSearchParams';

const serializer = Serializer.delimiter(',');

export const validateParams = <T>(
  schema: SearchParamsSchema<T>,
  searchParams: Record<string, string | string[] | undefined>,
) => {
  const normalizedSearchParams = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : value,
    ]),
  );
  const params = serializer.deserialize(
    new URLSearchParams(objectToURLSearchParams(normalizedSearchParams)),
  );
  const result = { ...params } as Record<keyof T, string | string[]>;

  for (const key of schema.arrayParams as Set<keyof T>) {
    const value = params[key as string];
    if (value !== undefined && !Array.isArray(value)) {
      result[key] = [value];
    }
  }

  return schema.validate(result);
};
