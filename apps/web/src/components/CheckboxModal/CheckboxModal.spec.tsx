import { ComponentProps } from 'react';

import { fireEvent, screen } from '@testing-library/react';

import { CheckboxData } from '@/hooks/useCheckboxes';
import { renderWithProviders } from '@/test/utils';

import { CheckboxModal } from '.';

describe('CheckboxModal', () => {
  const items: CheckboxData<string>[] = [
    { name: '1번', checked: false },
    { name: '2번', checked: false },
    { name: '3번', checked: true },
  ];

  const renderComponent = ({
    onConfirm,
  }: {
    onConfirm: ComponentProps<typeof CheckboxModal>['onConfirm'];
  }) => {
    renderWithProviders(
      <CheckboxModal
        header="header test"
        items={items}
        renderChildren={(data) => `${data} 아이템`}
        onConfirm={onConfirm}
      />,
    );
  };

  it('header가 렌더링 된다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    expect(screen.getByText('header test')).toBeInTheDocument();
  });

  it('모든 items이 renderChildren의 포맷에 맞추어 렌더링 된다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    for (const item of items) {
      expect(screen.getByText(`${item.name} 아이템`)).toBeInTheDocument();
    }
  });

  it('적용 버튼을 누르면 체크가 되어있는 name 목록을 가져올 수 있다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    fireEvent.click(screen.getByText('1번 아이템'));
    fireEvent.click(screen.getByText('적용'));

    expect(handleConfirm).toHaveBeenCalled();
    expect(handleConfirm.mock.calls[0][0]).toEqual(['1번', '3번']);
  });

  it('모두 선택 버튼을 누르면 모든 checkbox가 선택된다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    fireEvent.click(screen.getByText('모두 선택'));
    fireEvent.click(screen.getByText('적용'));

    expect(handleConfirm).toHaveBeenCalled();
    expect(handleConfirm.mock.calls[0][0]).toEqual(['1번', '2번', '3번']);
  });

  it('모두 checkbox가 선택됐으면, 모두 해제 버튼이 활성화된다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    fireEvent.click(screen.getByText('모두 선택'));

    expect(screen.getByText('모두 해제')).toBeInTheDocument();

    fireEvent.click(screen.getByText('모두 해제'));
    fireEvent.click(screen.getByText('적용'));
  });

  it('최소 하나 이상의 checkbox가 선택되어야 적용 버튼이 활성화된다.', () => {
    const handleConfirm = jest.fn();
    renderComponent({ onConfirm: handleConfirm });

    fireEvent.click(screen.getByText('모두 선택'));

    expect(screen.getByText('모두 해제')).toBeInTheDocument();

    fireEvent.click(screen.getByText('모두 해제'));
    fireEvent.click(screen.getByText('적용'));

    expect(handleConfirm).not.toHaveBeenCalled();
  });
});
