'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { AnimatePresence } from 'motion/react';

import FrozenRouter from '../FrozenRouter';

interface AnimatedModal {
  children: ReactNode;
}
export const AnimatedModal = ({ children }: AnimatedModal) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="sync" initial={false}>
      <FrozenRouter key={pathname}>{children}</FrozenRouter>
    </AnimatePresence>
  );
};
