import { render, screen, fireEvent } from '@testing-library/react';

import { uiTest } from '../../tests/uiTest';
import { Button } from './';

describe('Button 컴포넌트', () => {
  uiTest(Button, 'Button');

  it('Button을 클릭하면 onClick이 호출되어야 한다', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Click' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled Button을 클릭하면 onClick이 호출되지 않아야 한다', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Click' }));

    expect(handleClick).not.toHaveBeenCalledTimes(1);
  });
});
