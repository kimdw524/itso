import { useEffect, useState } from 'react';

export const useSticky = <T extends HTMLElement>(
  targetRef: React.RefObject<T | null>,
  top: number,
) => {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const target = targetRef.current;

    if (target === null) {
      return;
    }

    target.style['top'] = `${top}px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(!entry?.isIntersecting);
      },
      {
        rootMargin: `${-top - 1}px 0px 0px 0px`,
        threshold: 1,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, top]);

  return isPinned;
};
