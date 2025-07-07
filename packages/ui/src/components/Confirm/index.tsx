'use client';

import { useImperativeHandle, type ReactNode, type Ref } from 'react';

import { useOverlay, usePreventKeyboardInput } from '@repo/utils';

import { Box, Button, Dialog, DialogContent, DialogFooter } from '#components';

interface ConfirmProps {
  children: ReactNode;
  ref?: Ref<{ close: () => void }>;
  onConfirm: () => void;
  onCancle: () => void;
}

export const Confirm = ({ children, ref, onConfirm, onCancle }: ConfirmProps) => {
  const { close } = useOverlay();
  usePreventKeyboardInput();

  useImperativeHandle(ref, () => ({
    close,
  }));

  return (
    <Dialog>
      <DialogContent>{children}</DialogContent>
      <DialogFooter>
        <Box flex gap="md">
          <Button size="sm" onClick={onConfirm}>
            확인
          </Button>
          <Button color="secondary" size="sm" onClick={onCancle}>
            취소
          </Button>
        </Box>
      </DialogFooter>
    </Dialog>
  );
};
