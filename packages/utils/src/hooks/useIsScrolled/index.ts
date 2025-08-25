'use client';

import { useEffect, useState } from 'react';

export const useIsScrolled = <
  T extends React.RefObject<HTMLElement | null> | typeof window,
>(
  element: T,
) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const target = element instanceof Window ? element : element.current;

    if (target === null) {
      return;
    }

    const handleScroll = () => {
      if (target instanceof Window) {
        setIsScrolled(target.scrollY !== 0);
        return;
      }

      setIsScrolled(target.scrollTop !== 0);
    };

    handleScroll();

    target.addEventListener('scroll', handleScroll);

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [element]);

  return isScrolled;
};
