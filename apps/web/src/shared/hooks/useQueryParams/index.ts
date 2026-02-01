import { useCallback, useEffect, useMemo, useState } from 'react';

import { serializeQueryString } from '@/shared/utils/queryString';

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
  delimiter?: string,
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
    return serializeQueryString(params);
  }, [params]);

  // 상태와 URL(search param)을 동기화 하는 로직
  useEffect(() => {
    window.history.replaceState(
      {},
      '',
      `?${serializeQueryString(params, delimiter)}`,
    );
  }, [params, delimiter]);

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
