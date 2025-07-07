'use client';

import { createContext, useCallback, useMemo, useRef, useState, type ComponentProps, type ReactNode } from 'react';

import { CSSTransition, TransitionGroup } from '@repo/utils';

import { Toast } from '#components';

import { ToastContainer } from './ToastContainer';

export interface ToastData {
  id: number;
  color?: ComponentProps<typeof Toast>['color'];
  message: string;
  autoClose?: boolean;
  duration?: number;
  onClick?: (id: number) => void;
}

interface ToastContextType {
  push: (data: Omit<ToastData, 'id'>) => number;
  remove: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
}

const DEFAULT_TOAST_DURATION = 5000;

export const ToastProvider = ({ children, defaultDuration = DEFAULT_TOAST_DURATION }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const idRef = useRef<number>(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback<ToastContextType['push']>(
    ({ color, message, autoClose = true, duration = defaultDuration, onClick }) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, color, message, autoClose, duration, onClick }]);

      if (!autoClose) {
        return id;
      }

      // autoClose가 true면, 일정 시간이 지난 후 toast 제거
      setTimeout(() => {
        remove(id);
      }, duration);

      return id;
    },
    [defaultDuration, remove],
  );

  const handleToastClick = (toast: ToastData) => {
    // onClick 이벤트가 정의되어 있지 않으면 기본적으로 toast를 닫도록 한다.
    if (toast.onClick === undefined) {
      remove(toast.id);
      return;
    }

    toast.onClick(toast.id);
  };

  return (
    <ToastContext.Provider value={useMemo(() => ({ push, remove }), [push, remove])}>
      {children}
      <ToastContainer>
        <TransitionGroup>
          {toasts.map((toast) => (
            <CSSTransition
              as="div"
              key={toast.id}
              initial={{ opacity: 0, transform: 'translateY(1rem)', height: '0' }}
              animate={{ opacity: 1, transform: 'translateY(0)', height: '3.5rem' }}
              exit={{ opacity: 0, height: '0' }}
              duration={500}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
            >
              <Toast
                color={toast.color}
                duration={toast.autoClose ? toast.duration : 0}
                onClick={() => handleToastClick(toast)}
              >
                {toast.message}
              </Toast>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
