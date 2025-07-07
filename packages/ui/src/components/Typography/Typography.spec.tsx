import type { ComponentProps } from 'react';

import { cleanup, render, screen } from '@testing-library/react';

import { Typography } from '#components';

import { uiTest } from '../../tests/uiTest';

describe('Typogrphy 컴포넌트', () => {
  uiTest(Typography, 'Typography');

  test('기본적으로 p태그로 출력한다.', () => {
    render(<Typography>test</Typography>);
    expect(screen.getByText('test').tagName.toLowerCase()).toBe('p');
  });

  test('as에 전달된 알맞은 태그로 출력한다.', () => {
    const tags: ComponentProps<typeof Typography>['as'][] = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];

    for (const tag of tags) {
      cleanup();
      render(<Typography as={tag}>test</Typography>);
      expect(screen.getByText('test').tagName.toLowerCase()).toBe(tag);
    }
  });
});
