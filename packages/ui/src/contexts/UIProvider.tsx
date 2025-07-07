'use client';

import type { ReactNode } from 'react';

import { OverlayProvider, type OverlayOption } from '@repo/utils';

import { ToastProvider } from '#hooks';

import * as overlayStyle from '../styles/overlay.css';

interface UIProviderProps {
  children: ReactNode;
  overlayUnmountOn?: OverlayOption['unmountOn'];
}

export const UIProvider = ({ children, overlayUnmountOn = 'transitionEnd' }: UIProviderProps) => {
  return (
    <>
      <OverlayProvider className={{ ...overlayStyle }} unmountOn={overlayUnmountOn}>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </>
  );
};
