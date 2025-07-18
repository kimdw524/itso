import { renderHook } from '@testing-library/react';

import { useQueryParams } from '.';

describe('useQueryParams', () => {
  it('param의 값이 정의되지 않으면 출력하지 않는다.', () => {
    const { result } = renderHook(() =>
      useQueryParams<{ a: string; b: string[]; c: 'c1' | 'c2' }>({
        a: 'a',
        c: 'c1',
      }),
    );

    result.current.setParam('a', undefined);

    expect(result.current.getParam('a')).toBe(undefined);
    expect(result.current.getParam('b')).toBe(undefined);
    expect(result.current.getParam('c')).toBe('c1');
    expect(result.current.getParams()).toBe('c=c1');
  });

  it('param의 값으로 배열을 가질 수 있다.', () => {
    const { result } = renderHook(() =>
      useQueryParams<{ a: string[]; b: string[] }>(),
    );

    result.current.setParam('a', ['1', '2']);

    expect(result.current.getParam('a')).toEqual(['1', '2']);
    expect(result.current.getParams()).toBe('a=1&a=2');
  });
});
