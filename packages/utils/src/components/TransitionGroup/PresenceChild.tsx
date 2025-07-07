'use client';

import { type ReactNode } from 'react';

import { TransitionGroupContext } from '#components/TransitionGroup';

interface TransitionChildProps {
  children: ReactNode;
  id: number;
  elementKey: string | null;
  isUnmounted: boolean;
  onRequestUnmount: (key: string | null) => void;
}

export const TransitionChild = ({ children, id, elementKey, isUnmounted, onRequestUnmount }: TransitionChildProps) => {
  return (
    <TransitionGroupContext.Provider
      key={`${elementKey}-${id}`}
      value={{ isUnmounted, key: elementKey, requestUnmount: onRequestUnmount }}
    >
      {children}
    </TransitionGroupContext.Provider>
  );
};
