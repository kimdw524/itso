import { createRef } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { Select, SelectOption } from '.';
import { uiTest } from '../../tests/uiTest';

describe('Select 컴포넌트', () => {
  uiTest(Select, 'Select');

  it('클릭한 option의 내용이 Select에 보인다.', () => {
    render(
      <Select data-testid="select">
        <SelectOption value="1">1번</SelectOption>
        <SelectOption value="2">2번</SelectOption>
      </Select>,
    );

    const select = screen.getByTestId('select');

    fireEvent.click(screen.getByText('2번'));
    expect(select).toHaveTextContent('2번');
  });

  it('새로운 option을 클릭하면 onChange 이벤트가 발생하고, form value, ref.value의 값이 바뀐다.', () => {
    const handleChange = jest.fn();
    const ref = createRef<{ value?: string }>();

    render(
      <form data-testid="form">
        <Select data-testid="select" ref={ref} name="select" onChange={handleChange}>
          <SelectOption value="1">1번</SelectOption>
          <SelectOption value="2">2번</SelectOption>
        </Select>
      </form>,
    );

    const option2 = screen.getByText('2번');
    const form = screen.getByTestId('form') as HTMLFormElement;

    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toBe('2');
    expect(ref.current?.value).toBe('2');
    expect(new FormData(form).get('select')).toBe('2');

    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(ref.current?.value).toBe('2');
    expect(new FormData(form).get('select')).toBe('2');

    fireEvent.click(screen.getByText('1번'));
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0]).toBe('1');
    expect(ref.current?.value).toBe('1');
    expect(new FormData(form).get('select')).toBe('1');
  });

  it('defaultValue의 값이 기본으로 보인다.', () => {
    render(
      <Select data-testid="select" defaultValue="2">
        <SelectOption value="1">1번</SelectOption>
        <SelectOption value="2">2번</SelectOption>
      </Select>,
    );

    const select = screen.getByTestId('select');

    expect(select).toHaveTextContent('2번');
  });
});
