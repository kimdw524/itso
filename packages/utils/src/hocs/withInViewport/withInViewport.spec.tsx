import { useState, type ReactNode } from 'react';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withInViewport } from './';

describe('withInViewport', () => {
  let intersectionCallback: ((param: { isIntersecting: boolean }[]) => void) | undefined;

  beforeAll(() => {
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
  });

  it('Viewport 내에 존재할 때만 컴포넌트가 업데이트 된다.', async () => {
    const user = userEvent.setup();

    const ChildComponent = withInViewport(
      ({ children, ref }: { children: ReactNode; ref?: React.RefObject<HTMLDivElement> }) => {
        return (
          <div ref={ref} data-testid="component">
            {children}
          </div>
        );
      },
    );

    const TestComponent = () => {
      const [count, setCount] = useState<number>(0);

      return (
        <>
          <ChildComponent>{count}</ChildComponent>
          <button data-testid="countup" onClick={() => setCount((prev) => prev + 1)}>
            count up
          </button>
        </>
      );
    };

    render(<TestComponent />);

    const countUp = screen.getByTestId('countup');

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }]);
    });
    await user.click(countUp);
    expect(screen.getByTestId('component')).toHaveTextContent('1');

    act(() => {
      intersectionCallback?.([{ isIntersecting: false }]);
    });
    await user.click(countUp);
    expect(screen.getByTestId('component')).toHaveTextContent('1');

    act(() => {
      intersectionCallback?.([{ isIntersecting: true }]);
    });
    expect(screen.getByTestId('component')).toHaveTextContent('2');
  });
});
