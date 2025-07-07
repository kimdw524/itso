import { useContext, useMemo } from 'react';

import { ToastContext } from './ToastProvider';

export const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { push, remove } = toastContext;

  return useMemo(() => ({ push, remove }), [push, remove]);
};
