'use client';

import { useEffect } from 'react';

export const usePreventKeyboardInput = () => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
};
