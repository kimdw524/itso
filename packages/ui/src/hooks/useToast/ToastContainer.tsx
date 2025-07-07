import type { ReactNode } from 'react';

import * as s from './ToastContainer.css';

interface ToastContainerProps {
  children: ReactNode;
}

export const ToastContainer = ({ children }: ToastContainerProps) => {
  return <div className={s.container}>{children}</div>;
};
