import { act, render, screen, waitFor } from '@testing-library/react';

import { UIProvider } from '#contexts';
import { useDialog } from '#hooks';

describe('useDialog 테스트', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    const TestComponent = () => {
      const { alert, confirm } = useDialog();

      const handleConfirmClick = async () => {
        mockFn(await confirm('confirm'));
      };

      return (
        <>
          <button onClick={() => alert('alert')}>alert click</button>
          <button onClick={handleConfirmClick}>confirm click</button>
        </>
      );
    };

    render(
      <UIProvider overlayUnmountOn={'exit'}>
        <TestComponent />
      </UIProvider>,
    );
  });

  it('확인 버튼을 누르면 alert을 닫을 수 있다.', async () => {
    const alertButton = screen.getByRole('button', { name: 'alert click' });

    expect(screen.queryByText('alert')).not.toBeInTheDocument();

    act(() => {
      alertButton.click();
    });

    expect(screen.getByText('alert')).toBeInTheDocument();

    const okButton = screen.getByRole('button', { name: '확인' });
    act(() => {
      okButton.click();
    });

    expect(screen.queryByText('alert')).not.toBeInTheDocument();
  });

  it('confirm의 확인 버튼을 누르면 true, 취소 버튼을 누르면 false를 반환하고 모달이 닫힌다.', async () => {
    const confirmButton = screen.getByRole('button', { name: 'confirm click' });

    act(() => {
      confirmButton.click();
    });

    const okButton = screen.getByRole('button', { name: '확인' });
    act(() => {
      okButton.click();
    });

    await waitFor(() => {
      expect(mockFn.mock.calls[0][0]).toBe(true);
    });

    expect(screen.queryByText('confirm')).not.toBeInTheDocument();

    act(() => {
      confirmButton.click();
    });

    const cancelButton = screen.getByRole('button', { name: '취소' });
    act(() => {
      cancelButton.click();
    });

    await waitFor(() => {
      expect(mockFn.mock.calls[1][0]).toBe(false);
    });

    expect(screen.queryByText('confirm')).not.toBeInTheDocument();
  });
});
