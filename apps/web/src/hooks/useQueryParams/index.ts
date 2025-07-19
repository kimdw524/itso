import { useCallback, useMemo, useRef } from 'react';

export const useQueryParams = <
  Params extends {
    [K in keyof Params]:
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | undefined;
  },
>(
  initialValue: Partial<Params> = {},
) => {
  const params = useRef<Partial<Params>>(initialValue);

  const setParam = useCallback(
    <K extends keyof Params>(key: K, value: Params[K] | undefined): void => {
      params.current[key] = value;
    },
    [],
  );

  const getParam = useCallback(
    <K extends keyof Params>(key: K): Params[K] | undefined => {
      return params.current[key];
    },
    [],
  );

  const getParams = useCallback((): string => {
    const current = params.current;
    const result: string[] = [];

    for (const key in current) {
      const value = current[key];

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
  }, []);

  return useMemo(
    () => ({
      setParam,
      getParam,
      getParams,
    }),
    [setParam, getParam, getParams],
  );
};
