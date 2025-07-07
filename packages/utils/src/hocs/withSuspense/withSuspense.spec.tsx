import { render, screen } from '@testing-library/react';
import { act } from '@testing-library/react';

import { withSuspense } from './';

describe('withSuspense', () => {
  it('비동기 작업 중에는 fallback 컴포넌트를 렌더링하고, 완료 후 메인 컴포넌트를 렌더링한다.', async () => {
    jest.useFakeTimers();

    let cache = false;

    const TestComponent = () => {
      if (!cache) {
        throw new Promise((resolve) =>
          setTimeout(() => {
            cache = true;
            resolve('');
          }, 2000),
        );
      }
      return <div>Test Component</div>;
    };

    const FallbackComponent = () => {
      return <div>Fallback</div>;
    };

    const WrappedComponent = withSuspense(TestComponent, <FallbackComponent />);

    render(<WrappedComponent />);

    expect(screen.queryByText('Test Component')).not.toBeInTheDocument();
    expect(screen.queryByText('Fallback')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(2000);
      await Promise.resolve();
    });

    expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Component')).toBeInTheDocument();
  });
});
