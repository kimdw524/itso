'use client';

import { type ReactNode, useCallback, useMemo, useRef } from 'react';

import { useOverlay } from '@repo/utils';

import { Alert, Confirm } from '#components';

export const useDialog = () => {
  const { push } = useOverlay();
  const dialogRef = useRef<{ close: () => void }>(null);

  const alert = useCallback(
    (message: ReactNode) => {
      return new Promise((resolve) => {
        push(<Alert>{message}</Alert>, { onClose: () => resolve(true) });
      });
    },
    [push],
  );

  const confirm = useCallback(
    (message: ReactNode): Promise<boolean> => {
      return new Promise((resolve) => {
        const handleConfirm = () => {
          resolve(true);
          dialogRef.current?.close();
        };

        const handleCancle = () => {
          resolve(false);
          dialogRef.current?.close();
        };

        push(
          <Confirm ref={dialogRef} onConfirm={handleConfirm} onCancle={handleCancle}>
            {message}
          </Confirm>,
          { onClose: () => resolve(false) },
        );
      });
    },
    [push],
  );

  return useMemo(() => ({ alert, confirm }), [alert, confirm]);
};
