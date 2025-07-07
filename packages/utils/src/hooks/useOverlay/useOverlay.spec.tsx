import { useContext } from 'react';

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Overlay } from './Overlay';
import { OverlayContext } from './OverlayContext';
import { OverlayIdContext } from './OverlayIdContext';
import { OverlayProvider } from './OverlayProvider';
import { useOverlay } from './useOverlay';

describe('useOverlay', () => {
  const OverlayComponent = () => {
    const { close } = useOverlay();
    const id = useContext(OverlayIdContext);

    return (
      <button data-testid="overlay" onClick={close}>
        overlay {id}
      </button>
    );
  };

  const ChildComponent = () => {
    const { pop, push } = useOverlay();

    return (
      <>
        <button data-testid="push" onClick={() => push(<OverlayComponent />)}>
          push
        </button>
        <button data-testid="pop" onClick={pop}>
          pop
        </button>
      </>
    );
  };

  const TestComponent = () => {
    return (
      <OverlayProvider unmountOn={'exit'} closeOnBack={false}>
        <ChildComponent />
      </OverlayProvider>
    );
  };

  it('modal을 push 한 후에 pop하면 사라진다.', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const pushButton = screen.getByTestId('push');
    const popButton = screen.getByTestId('pop');

    await user.click(pushButton);
    expect(screen.queryByTestId('overlay')).toBeInTheDocument();

    await user.click(popButton);
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('modal을 여러 개 띄울 수 있고 pop 호출 시 1개씩 닫힌다.', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const pushButton = screen.getByTestId('push');
    const popButton = screen.getByTestId('pop');

    await user.click(pushButton);
    await user.click(pushButton);
    await user.click(pushButton);
    expect(screen.queryAllByTestId('overlay').length).toBe(3);

    await user.click(popButton);
    expect(screen.queryAllByTestId('overlay').length).toBe(2);
  });

  it('close 함수로 원하는 id의 모달을 닫을 수 있다.', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const pushButton = screen.getByTestId('push');

    await user.click(pushButton);
    await user.click(pushButton);
    await user.click(pushButton);

    await user.click(screen.getByText('overlay 2'));
    expect(screen.queryByText('overlay 2')).not.toBeInTheDocument();

    await user.click(screen.getByText('overlay 1'));
    expect(screen.queryByText('overlay 1')).not.toBeInTheDocument();
  });

  it('뒤로가기를 눌러서 모달을 닫을 수 있다.', async () => {
    const user = userEvent.setup();
    render(
      <OverlayProvider unmountOn={'exit'}>
        <ChildComponent />
      </OverlayProvider>,
    );

    const pushButton = screen.getByTestId('push');

    await user.click(pushButton);
    expect(screen.queryByTestId('overlay')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('popstate'));
    });
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('closeOnBackdropClick=true 이면, backdrop을 클릭해서 모달을 닫을 수 있다.', async () => {
    const user = userEvent.setup();
    const result = render(
      <OverlayProvider closeOnBackdropClick={true}>
        <ChildComponent />
      </OverlayProvider>,
    );

    const pushButton = screen.getByTestId('push');

    await user.click(pushButton);
    expect(screen.queryByTestId('overlay')).toBeInTheDocument();

    const root = result!.container.querySelectorAll('div')[0]!;
    act(() => {
      root.dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('closeOnBackdropClick=false 이면, backdrop을 클릭해서 모달을 닫을 수 없다.', async () => {
    const user = userEvent.setup();
    const result = render(
      <OverlayProvider closeOnBackdropClick={false}>
        <ChildComponent />
      </OverlayProvider>,
    );

    const pushButton = screen.getByTestId('push');

    await user.click(pushButton);
    expect(screen.queryByTestId('overlay')).toBeInTheDocument();

    const root = result!.container.querySelectorAll('div')[0]!;
    act(() => {
      root.dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(screen.queryByTestId('overlay')).toBeInTheDocument();
  });

  it('Overlay 컴포넌트는 반드시 OverlayContext 컴포넌트 내에 정의되어야 한다.', () => {
    expect(() =>
      render(
        <div>
          <Overlay id={1} isActive={false}>
            Overlay
          </Overlay>
        </div>,
      ),
    ).toThrow();
  });

  it('Overlay 컴포넌트는 현재 상태에 맞는 className을 가진다.', () => {
    let result: ReturnType<typeof render>;

    act(() => {
      result = render(
        <OverlayProvider>
          <Overlay className={{ base: 'base', enter: 'enter', exit: 'exit' }} id={1} isActive>
            Overlay
          </Overlay>
        </OverlayProvider>,
      );
    });

    const root = result!.container.querySelectorAll('div')[0];

    expect(root).toHaveClass('base');
    expect(root).toHaveClass('enter');
  });

  it("unmountOn='transitionEnd' 일 때, 애니메이션이 끝난 후 모달이 unmount된다.", () => {
    let result: ReturnType<typeof render>;
    const mock = jest.fn();

    act(() => {
      result = render(
        <OverlayProvider>
          <Overlay
            className={{ base: 'base', enter: 'enter', exit: 'exit' }}
            id={1}
            unmountOn="transitionEnd"
            requestUnmount={mock}
            isActive={false}
          >
            Overlay
          </Overlay>
        </OverlayProvider>,
      );
    });

    const root = result!.container.querySelectorAll('div')[0]!;
    expect(root).toHaveClass('exit');
    expect(mock).not.toHaveBeenCalled();

    act(() => {
      root.dispatchEvent(new Event('transitionend', { bubbles: true }));
    });
    expect(mock).toHaveBeenCalled();
  });

  it("unmountOn='transitionEnd' 가 아닌 경우, 애니메이션이 끝나도 unmount되지 않는다.", () => {
    let result: ReturnType<typeof render>;
    const mock = jest.fn();

    act(() => {
      result = render(
        <OverlayProvider>
          <Overlay
            className={{ base: 'base', enter: 'enter', exit: 'exit' }}
            id={1}
            requestUnmount={mock}
            isActive={false}
          >
            Overlay
          </Overlay>
        </OverlayProvider>,
      );
    });

    const root = result!.container.querySelectorAll('div')[0]!;
    act(() => {
      root.dispatchEvent(new Event('transitionend', { bubbles: true }));
    });
    expect(mock).not.toHaveBeenCalled();
  });
  it("unmountOn='exit' 일 때, 모달을 닫자마자 requestUnmount 콜백이 호출된다.", () => {
    const mock = jest.fn();

    act(() => {
      render(
        <OverlayProvider>
          <Overlay
            className={{ base: 'base', enter: 'enter', exit: 'exit' }}
            id={1}
            unmountOn="exit"
            requestUnmount={mock}
            isActive={false}
          >
            Overlay
          </Overlay>
        </OverlayProvider>,
      );
    });

    expect(mock).toHaveBeenCalled();
  });

  it('unmountOn에 숫자가 주어지면, 해당 시간 이후에 requestUnmount 콜백이 호출된다.', () => {
    const mock = jest.fn();

    jest.useFakeTimers();

    act(() => {
      render(
        <OverlayProvider>
          <Overlay
            className={{ base: 'base', enter: 'enter', exit: 'exit' }}
            id={1}
            unmountOn={200}
            requestUnmount={mock}
            isActive={false}
          >
            Overlay
          </Overlay>
        </OverlayProvider>,
      );
    });

    jest.advanceTimersByTime(100);
    expect(mock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(mock).toHaveBeenCalled();
  });

  it('OverlayProvider 내에 useOverlay가 호출되지 않으면 오류가 발생한다.', () => {
    const TestComponent = () => {
      useOverlay();

      return null;
    };

    expect(() => render(<TestComponent />)).toThrow();
  });

  it('OverlayProvider 내에 useOverlay가 호출되어야 한다.', () => {
    const TestComponent = () => {
      useOverlay();

      return null;
    };

    expect(() =>
      render(
        <OverlayProvider>
          <TestComponent />
        </OverlayProvider>,
      ),
    ).not.toThrow();
  });

  it('overlay가 없을 때 pop을 호출하면 false를 반환한다.', () => {
    const TestComponent = () => {
      const overlayContext = useContext(OverlayContext)!;
      return <div data-testid="target">{overlayContext.pop() ? 'true' : 'false'}</div>;
    };

    render(
      <OverlayProvider>
        <TestComponent />
      </OverlayProvider>,
    );

    expect(screen.getByTestId('target')).toHaveTextContent('false');
  });
});
