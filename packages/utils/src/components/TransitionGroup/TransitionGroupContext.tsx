'use client';

import { createContext } from 'react';

interface TransitionGroupContext {
  isUnmounted: boolean;
  key: string | null;
  requestUnmount: (key: string | null) => void;
}

export const TransitionGroupContext = createContext<TransitionGroupContext | undefined>(undefined);
