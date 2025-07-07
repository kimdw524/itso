import { render, screen, fireEvent } from '@testing-library/react';

import { Dialog, DialogContent, DialogFooter, DialogHeader } from '#components';

import { uiTest } from '../../tests/uiTest';

describe('Dialog 컴포넌트', () => {
  uiTest(Dialog, 'Dialog');
  uiTest(DialogHeader, 'DialogHeader');
  uiTest(DialogContent, 'DialogContent');
  uiTest(DialogFooter, 'DialogFooter');

  it('DialogHeader의 닫기 버튼을 클릭하면 onCloseClick이 호출되어야 한다', () => {
    const handleCloseClick = jest.fn();
    render(
      <Dialog>
        <DialogHeader onCloseClick={handleCloseClick}>Header</DialogHeader>
        <DialogContent>Content</DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole('button', { name: '닫기' }));

    expect(handleCloseClick).toHaveBeenCalledTimes(1);
  });
});
