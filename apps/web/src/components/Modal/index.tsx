'use client';

import type { ReactNode } from 'react';

import { usePreventScroll } from '@kimdw-rtk/utils';
import { motion } from 'motion/react';

import * as s from './style.css';

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  usePreventScroll();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: '3%' }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: '3%' }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={s.container}
    >
      <div className={s.inner}>{children}</div>
    </motion.div>
  );
};
