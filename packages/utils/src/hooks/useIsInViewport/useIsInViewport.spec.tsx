import { useRef } from 'react';

import { act, render, screen } from '@testing-library/react';

import { useIsInViewport } from '.';

describe('useIsInViewport', () => {
  it('viewport 내에 보이는 경우만 true를 반환한다.', () => {
    let intersectionCallback: ((param: { isIntersecting: boolean }[]) => void) | undefined;

    class IntersectionObserverMock {
      constructor(callback: typeof intersectionCallback) {
        intersectionCallback = callback;
      }
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      const { isInViewport } = useIsInViewport(ref);

      return (
        <div data-testid="target" ref={ref}>
          {isInViewport ? 'true' : 'false'}
        </div>
      );
    };

    render(<TestComponent />);

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('true');

    act(() => {
      intersectionCallback?.([{ isIntersecting: false }]);
    });
    expect(screen.getByTestId('target')).toHaveTextContent('false');
  });
});
