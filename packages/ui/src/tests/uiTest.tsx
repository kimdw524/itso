import React from 'react';

import { render, screen } from '@testing-library/react';

import { sprinkles } from '#styles';

//eslint-disable-next-line
export const uiTest = <T extends HTMLElement>(Component: React.ComponentType<any>, name: string) => {
  describe(`${name} UI`, () => {
    test('컴포넌트가 렌더링된다.', () => {
      render(<Component data-testid="component" />);
      expect(screen.getByTestId('component')).toBeInTheDocument();
    });

    test('sprinkles을 사용할 수 있다.', () => {
      render(<Component className={sprinkles({ margin: 'md' })} data-testid="component" />);
      expect(screen.getByTestId('component')).toHaveClass(sprinkles({ margin: 'md' }));
    });

    test('sx를 사용할 수 있다.', () => {
      render(<Component sx={{ margin: 'md' }} data-testid="component" />);
      expect(screen.getByTestId('component')).toHaveClass(sprinkles({ margin: 'md' }));
    });

    test('className을 적용할 수 있다.', () => {
      render(<Component className="test" data-testid="component" />);
      expect(screen.getByTestId('component')).toHaveClass('test');
    });

    test('inline style을 적용할 수 있다.', () => {
      render(<Component style={{ color: 'red' }} data-testid="component" />);
      expect(screen.getByTestId('component')).toHaveStyle({ color: 'red' });
    });

    test('ref를 적용할 수 있다.', () => {
      const ref = React.createRef<T>();
      render(<Component ref={ref} />);

      expect(ref.current).not.toBeNull();
    });
  });
};
