/**
 * object를 queryString으로 직렬화하는 함수
 */
export const serializeQueryString = <
  T extends {
    [K in keyof T]:
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | undefined;
  },
>(
  params: T,
): string => {
  const result: string[] = [];

  for (const key in params) {
    const value = params[key];

    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        result.push(`${key}=${item}`);
      }
      continue;
    }

    result.push(`${key}=${encodeURIComponent(value)}`);
  }

  return result.join('&');
};

/**
 * queryString을 object로 변환하는 함수
 */
export function parseQueryString(
  query: string,
): Record<string, string | string[]> {
  const params = new URLSearchParams(query);
  const result: Record<string, string | string[]> = {};

  for (const key of params.keys()) {
    const values = params.getAll(key);
    result[key] = values.length > 1 ? values : values[0]!;
  }

  return result;
}
