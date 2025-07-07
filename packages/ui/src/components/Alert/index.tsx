import { type ReactNode } from 'react';

import { useOverlay, usePreventKeyboardInput } from '@repo/utils';

import { Button, Dialog, DialogContent, DialogFooter } from '#components';

interface AlertProps {
  children: ReactNode;
}

export const Alert = ({ children }: AlertProps) => {
  const { close } = useOverlay();
  usePreventKeyboardInput();

  return (
    <Dialog>
      <DialogContent>{children}</DialogContent>
      <DialogFooter>
        <Button size="sm" onClick={close}>
          확인
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
