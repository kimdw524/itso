'use client';

import { useEffect, useState } from 'react';

export const useIsInViewport = <T extends HTMLElement | null>(targetRef: React.RefObject<T>) => {
  const [isInViewport, setIsInViewport] = useState<boolean | undefined>();

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInViewport(entry.isIntersecting);
      });
    };

    const observer = new window.IntersectionObserver(observerCallback, {
      threshold: 0,
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return { isInViewport };
};
