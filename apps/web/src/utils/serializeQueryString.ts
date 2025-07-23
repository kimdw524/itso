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
