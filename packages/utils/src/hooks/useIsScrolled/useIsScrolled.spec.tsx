import { act, renderHook } from '@testing-library/react';

import { useIsScrolled } from './';

describe('useIsScrolled', () => {
  expect(Object.create(Window.prototype) instanceof Window).toBe(true);

  it('element가 세로 스크롤이 됐을 때만 true를 반환한다.', () => {
    const div = document.createElement('div');
    const { result } = renderHook(() => useIsScrolled(div));

    act(() => {
      div.scrollTop = 0;
      div.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    act(() => {
      div.scrollTop = 10;
      div.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('window가 세로 스크롤이 됐을 때만 true를 반환한다.', () => {
    Object.setPrototypeOf(window, Window.prototype);
    const { result } = renderHook(() => useIsScrolled(window));

    expect(window instanceof Window).toBe(true);

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    act(() => {
      window.scrollY = 10;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});
