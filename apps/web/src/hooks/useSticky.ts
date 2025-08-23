import { useEffect, useState } from 'react';

export const useSticky = <T extends HTMLElement>(
  targetRef: React.RefObject<T | null>,
) => {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const target = targetRef.current;

    if (target === null) {
      return;
    }

    const top = parseInt(getComputedStyle(target).top);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry?.isIntersecting);
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
  }, [targetRef]);

  return { isStuck };
};
