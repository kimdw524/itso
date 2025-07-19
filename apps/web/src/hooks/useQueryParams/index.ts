import { useCallback, useMemo, useState } from 'react';

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
  const [params, setParams] = useState<Partial<Params>>(initialValue);

  const setParam = useCallback(
    <K extends keyof Params>(key: K, value: Params[K] | undefined): void => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const getParam = useCallback(
    <K extends keyof Params>(key: K): Params[K] | undefined => {
      return params[key];
    },
    [params],
  );

  const removeParam = useCallback(<K extends keyof Params>(key: K): void => {
    setParams((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;

      return rest as Partial<Params>;
    });
  }, []);

  const getParams = useCallback((): string => {
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
  }, [params]);

  return useMemo(
    () => ({
      rawParams: params,
      setParam,
      getParam,
      removeParam,
      getParams,
    }),
    [params, setParam, getParam, removeParam, getParams],
  );
};
